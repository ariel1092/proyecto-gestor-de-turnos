"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appoinmentController_1 = __importDefault(require("../controllers/appoinmentController"));
const appoinmentRouter = (0, express_1.Router)();
appoinmentRouter.get("/", (req, res, next) => {
    appoinmentController_1.default.getAppoinmentController(req, res, next);
});
appoinmentRouter.get("/:id", (req, res, next) => {
    appoinmentController_1.default.getAppoinmentByIdController(req, res, next);
});
appoinmentRouter.post("/schedule", (req, res, next) => {
    appoinmentController_1.default.registerAppoinmentController(req, res, next);
});
appoinmentRouter.put("/cancel/:id", (req, res, next) => {
    appoinmentController_1.default.cancelAppoinmentController(req, res, next);
});
exports.default = appoinmentRouter;
