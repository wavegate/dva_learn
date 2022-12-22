import express, { Request, Response } from "express";
import getUser, { UserRequest } from "../middleware/getUser";
import Post from "../models/Post";

const PostRouter = express.Router();

PostRouter.all("/", getUser, async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;
  switch (req.method) {
    case "GET": {
      const posts = await Post.find({});
      return res.json({ posts: posts });
    }
    case "POST": {
      const postData = req.body;
      const newPost = await Post.create({
        title: postData.title,
        body: postData.body,
        user: user,
      });
      user.posts.push(newPost);
      user.save();
      return res.json({ success: true });
    }
  }
  return res.json({ message: "hi" });
});

export default PostRouter;
