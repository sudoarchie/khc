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
exports.TeacherSignUp = TeacherSignUp;
exports.TeacherSignIn = TeacherSignIn;
const client_1 = require("@prisma/client");
const hashUtils_1 = __importDefault(require("../utils/hashUtils"));
const prisma = new client_1.PrismaClient();
function TeacherSignUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const hashedPassword = yield (0, hashUtils_1.default)({ password: data.password });
            const createdData = yield prisma.teacher.create({
                data: {
                    name: data.name,
                    firstName: data.firstName,
                    secondName: data.secondName,
                    thirdName: data.thirdName,
                    email: data.email,
                    password: hashedPassword,
                },
            });
            res.status(200).json({
                msg: "Teacher created successfully",
                teacher: createdData, // Optionally return the created teacher data
            });
        }
        catch (error) {
            res.status(500).json({
                msg: "Something went wrong",
                error: error.message || error, // Log the error for debugging
            });
        }
    });
}
function TeacherSignIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const teacher = yield prisma.teacher.findUnique({
                where: {
                    email: data.email,
                },
            });
        }
        catch (error) {
            res.status(401).json({
                msg: "something when wrong",
                err: error
            });
            console.log(error);
        }
    });
}
