"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash("securepassword123", 10);
        // Seed Admin
        const admin = yield prisma.admin.upsert({
            where: { email: "admin@example.com" },
            update: {},
            create: {
                email: "admin@example.com",
                password: hashedPassword,
            },
        });
        console.log(`Admin seeded: ${admin.email}`);
        // Seed Curriculum
        const curriculum = yield prisma.curriculum.create({
            data: {
                name: "Standard Curriculum",
                description: "Curriculum for standard grades",
                logoUrl: "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
            },
        });
        console.log(`Curriculum seeded: ${curriculum.name}`);
        // Seed Grade
        const grade = yield prisma.grade.create({
            data: {
                name: "Grade 10",
                curriculumId: curriculum.id,
            },
        });
        console.log(`Grade seeded: ${grade.name}`);
        // Seed Subject
        const subject = yield prisma.subject.create({
            data: {
                name: "Mathematics",
                gradeId: grade.id,
            },
        });
        console.log(`Subject seeded: ${subject.name}`);
        // Seed Teacher
        const teacher = yield prisma.teacher.create({
            data: {
                name: "John Doe",
                email: "johndoe@example.com",
                mobileNo: "1234567890",
                password: hashedPassword,
            },
        });
        console.log(`Teacher seeded: ${teacher.name}`);
        // Seed Student
        const student = yield prisma.student.create({
            data: {
                email: "student@example.com",
                mobileNo: "9876543210",
                name: "Jane Doe",
                password: hashedPassword,
                country: "US",
                gradeId: grade.id,
            },
        });
        console.log(`Student seeded: ${student.name}`);
        // Seed Assignment
        const assignment = yield prisma.assignment.create({
            data: {
                name: "Algebra Homework",
                description: "Solve the algebra problems in the provided document.",
                url: "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
                subjectId: subject.id,
                visible: true,
            },
        });
        console.log(`Assignment seeded: ${assignment.name}`);
        // Seed Blog
        const blog = yield prisma.blog.create({
            data: {
                title: "Introduction to Algebra",
                description: "A detailed guide to understanding algebra.",
                url: "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
            },
        });
        console.log(`Blog seeded: ${blog.title}`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
