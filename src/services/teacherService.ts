import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface teacher {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
}
async function TeacherSignUp({ name, email, mobileNo, password }: teacher) {
  console.log(process.env); // Debugging line to see if environment variables are loaded

  try {
    const hashedPassword = await HashPassword({ password: password });
    const createdData = await prisma.teacher.create({
      data: {
        name: name,
        email: email,
        mobileNo,
        password: hashedPassword,
      },
    });
    return {
      msg: "Account created successful",
    };
  } catch (error: any) {
    if (error) throw error;
    else throw new Error("Something went wrong");
  }
}

interface teacherSignIn {
  email: string;
  password: string;
}

async function TeacherLogin({ email, password }: teacherSignIn) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: email,
      },
    });

    if (!teacher) {
      throw new Error("Username does not exist");
    }

    const verifyPassword = await bcrypt.compare(password, teacher.password);

    if (!verifyPassword) {
      throw new Error("Incorrect Password");
    } else {
      // Ensure JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not configured");
      }

      const token = jwt.sign(
        {
          id: teacher.id,
          email: teacher.email,
        },
        process.env.JWT_SECRET || "MYsuperSECREATpassword", // Optional: Token expiration time
      );

      return {
        msg: "Login Successful",
        token,
      };
    }
  } catch (error: any) {
    if (error.message) {
      return error;
    } else {
      throw new Error(error);
    }
  }
}

async function TeacherDataForAdmin(take: number) {
  let skip = take - 30;
  if (skip < 0) {
    skip = 0;
  }
  try {
    const data = await prisma.teacher.findMany({
      take,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        mobileNo: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function TeacherProfile(id: string) {
  try {
    const data = await prisma.teacher.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobileNo: true,
        createdAt: true,
        teacherSubjects: {
          select: {
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
        Enrollment: {
          select: {
            student: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function TeacherUpdate({
  id,
  name,
  email,
  mobileNo,
  password,
}: {
  id: string;
  name: string;
  email: string;
  mobileNo: string;
  password: string;
}) {
  try {
    const data = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        mobileNo,
        password,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function TeacherSubject({
  teacherId,
  subjectId,
}: {
  teacherId: string;
  subjectId: string;
}) {
  try {
    const data = await prisma.teacherSubject.create({
      data: {
        teacherId,
        subjectId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  TeacherLogin,
  TeacherSignUp,
  TeacherDataForAdmin,
  TeacherProfile,
  TeacherSubject,
  TeacherUpdate,
};
