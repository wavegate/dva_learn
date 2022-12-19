import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routers/UserRouter";

const app = express();

dotenv.config();
const mongodb_uri = process.env.MONGODB_URI;
if (mongodb_uri) {
  mongoose.connect(mongodb_uri);
} else {
  throw Error("MONGODB_URI in .env missing");
}
export const connection = mongoose.connection;

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use("/", express.json());
app.use(cookieParser());

app.use("/users", UserRouter);

app.all("*", (req: Request, res: Response) => {
  return res.status(400).json({ error: "Invalid URI" });
});

export default app;
