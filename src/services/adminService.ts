require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
interface admin {
  email: string;
  password: string;
}
async function AdminSignIn({ email, password }: admin) {
  if (!email || !password) {
    throw new Error("Incorrect Email or Password");
  }
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) {
      throw new Error("wrong creadentials");
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      throw new Error("Wrong Creadentials");
    }
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET || "MYsuperSECREATpassword", // Optional: Token expiration time
    );

    return token;
  } catch (err: any) {
    if (err.message) {
      throw err;
    } else {
      throw new Error("Something went wrong!!!");
    }
  }
}

async function AdminDashboard() {
  try {
    const NumberOfStudent = await prisma.student.count();
    const NumberOfTeacher = await prisma.teacher.count();
    const NumberOfCourses = await prisma.course.count();
    const NumberOfBlog = await prisma.blog.count();
    const NumberOfAssignment = await prisma.assignment.count();
    const NumberOfGeneralVideo = await prisma.generalVideo.count();
    const NumberOfMasterClassVideos = await prisma.courseVideo.count();
    return {
      NumberOfStudent,
      NumberOfTeacher,
      NumberOfCourses,
      NumberOfBlog,
      NumberOfAssignment,
      NumberOfGeneralVideo,
      NumberOfMasterClassVideos,
    };
  } catch (err) {
    throw err;
  }
}

export { AdminSignIn, AdminDashboard };
