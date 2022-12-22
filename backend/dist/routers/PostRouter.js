"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUser_1 = __importDefault(require("../middleware/getUser"));
const Post_1 = __importDefault(require("../models/Post"));
const PostRouter = express_1.default.Router();
PostRouter.all("/", getUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    switch (req.method) {
        case "GET": {
            const posts = yield Post_1.default.find({});
            return res.json({ posts: posts });
        }
        case "POST": {
            const postData = req.body;
            const newPost = yield Post_1.default.create({
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
}));
exports.default = PostRouter;
