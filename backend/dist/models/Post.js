"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
exports.default = mongoose_1.default.model("Post", PostSchema);
