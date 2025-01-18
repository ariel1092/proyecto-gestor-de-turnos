"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
// import { authenticateJWT } from "../middleware/authMiddleware";
const userRoute = (0, express_1.Router)();
userRoute.get("/", (req, res, next) => {
    userController_1.default.getUserController(req, res, next);
});
userRoute.get("/:id", (req, res, next) => {
    userController_1.default.getUserByIdController(req, res, next);
});
userRoute.post("/register", (req, res, next) => {
    userController_1.default.registerUserController(req, res, next);
});
userRoute.post("/login", (req, res, next) => {
    userController_1.default.loginUserController(req, res, next);
});
exports.default = userRoute;
