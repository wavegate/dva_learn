"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const mongodb_uri = process.env.MONGODB_URI;
if (mongodb_uri) {
    mongoose_1.default.connect(mongodb_uri);
}
else {
    throw Error("MONGODB_URI in .env missing");
}
exports.connection = mongoose_1.default.connection;
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"], credentials: true }));
app.use("/", express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/users", UserRouter_1.default);
app.all("*", (req, res) => {
    return res.status(400).json({ error: "Invalid URI" });
});
exports.default = app;
