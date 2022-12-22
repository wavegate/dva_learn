import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createToken = (_id: string): string => {
  if (process.env.JWT_KEY) {
    return jwt.sign({ _id }, process.env.JWT_KEY, { expiresIn: "31d" });
  } else {
    throw Error("No JWT_KEY");
  }
};

const UserRouter = express.Router();

UserRouter.all("/", async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET": {
      const users = await User.find({}).populate("posts");
      return res.json({ users: users });
    }
    case "POST": {
      const userData = req.body;
      const user = await User.findOne({ email: userData.email });
      if (user) {
        return res.status(409).json({ error: "User already exists." });
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 8);
        const newUser = await User.create({
          email: userData.email,
          password: hashedPassword,
        });
        const token = createToken(newUser._id.toString());
        return res
          .cookie("token", token, {
            httpOnly: true,
          })
          .json({
            success: true,
          });
      }
    }
    case "DELETE": {
      const userData = req.body;
      const user = await User.findOneAndDelete({ _id: userData._id });
      if (user) {
        return res.json({ success: true });
      } else {
        return res.status(422).json({ error: "User not found." });
      }
    }
  }
});

UserRouter.post("/login", async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await User.findOne({ email: userData.email });
  if (user) {
    const correctPassword = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(422).json({ error: "Incorrect password." });
    } else if (correctPassword) {
      const token = createToken(user._id.toString());
      return res
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
        });
    }
  }
});

UserRouter.post("/logout", async (req: Request, res: Response) => {
  return res.clearCookie("token").json({
    success: true,
  });
});

export default UserRouter;

// UserRouter.post(
//   "/login",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data: { email: string; password: string } = req.body;
//     if (!validateLogin(data)) {
//       return res.status(422).json({
//         error: "UnprocessableEntity",
//         description: "Input does not pass validation filter.",
//         status: 422,
//         message: "The email or password was not in a proper format.",
//       });
//     }
//     const userWithEmail: UserInterface | null = await User.findOne({
//       email: data.email,
//     });
//     if (!userWithEmail) {
//       return res.status(422).json({
//         error: "UnprocessableEntity",
//         description: `No user exists with the provided email: ${data.email}.`,
//         status: 422,
//         message: "No user exists with the provided email.",
//       });
//     }
//     const checkPassword = await bcrypt.compare(
//       data.password,
//       userWithEmail.password
//     );
//     if (!checkPassword) {
//       return res.status(422).json({
//         error: "UnprocessableEntity",
//         description: "Invalid credentials.",
//         status: 422,
//         message: "Incorrect password.",
//       });
//     }
//     const token = createToken(userWithEmail._id.toString());
//     return res
//       .cookie("token", token, {
//         httpOnly: false,
//       })
//       .json({
//         status: 200,
//         message: `User with email ${userWithEmail.email} successfully logged in.`,
//       });
//   }
// );

// UserRouter.put(
//   "/profile",
//   checkUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data: { name?: string; profile_picture?: string } = req.body;
//     if (!validateProfile(data)) {
//       return res.status(422).json({
//         error: "UnprocessableEntity",
//         description: "Input does not pass validation filter.",
//         status: 422,
//         message: "The name or profile picture URL was not in a proper format.",
//       });
//     }
//     const updatedUser: UserInterface | null = await User.findOneAndUpdate(
//       {
//         _id: (req as UserRequest).user?._id,
//       },
//       data,
//       { new: true }
//     );
//     return res.json({
//       status: 200,
//       message: `Profile successfuly updated.`,
//     });
//   }
// );

// UserRouter.post(
//   "/register",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data: { email: string; password: string } = req.body;
//     if (!validateRegister(data)) {
//       return res.status(422).json({
//         error: "UnprocessableEntity",
//         description: "Input does not pass validation filter.",
//         status: 422,
//         message: "The email or password was not in a proper format.",
//       });
//     }
//     const userWithEmail: UserInterface | null = await User.findOne({
//       email: data.email,
//     });
//     if (userWithEmail) {
//       return res.status(409).json({
//         error: "Conflict",
//         description: `User already exists with email: ${data.email}.`,
//         status: 409,
//         message: "User already exists with given email.",
//       });
//     }
//     const newUser = await User.register(data.email, data.password);
//     if (!newUser) {
//       return res.status(400).json({ error: "unpredicted error" });
//       // resolve errors
//     } else {
//       const token = createToken(newUser._id.toString());
//       return res
//         .cookie("token", token, {
//           httpOnly: true,
//         })
//         .json({
//           status: 200,
//           message: `User with email ${newUser.email} successfully created and logged in.`,
//         });
//     }
//   }
// );

// UserRouter.post(
//   "/logout",
//   async (req: Request, res: Response, next: NextFunction) => {
//     return res.clearCookie("token").json({
//       status: 200,
//       message: "Token cleared.",
//     });
//   }
// );

// UserRouter.get(
//   "/currentUser",
//   checkUser,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const currentUser: UserInterface | null = await User.findOne({
//       _id: (req as UserRequest).user?._id,
//     }).select("email name profile_picture");
//     return res.json({
//       currentUser: currentUser,
//     });
//   }
// );

// export default UserRouter;
