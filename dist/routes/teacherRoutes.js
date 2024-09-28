"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherService_1 = require("../services/teacherService");
const teacherRouter = express_1.default.Router();
teacherRouter.post("/signup", teacherService_1.TeacherSignUp);
exports.default = teacherRouter;
