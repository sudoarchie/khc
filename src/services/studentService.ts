import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface Student {
  email: string;
  password: string;
  name: string;
  mobileNo: number;
  country: string;
  gradeId: string;
  curriculumId: string;
}

async function StudentSignUp({
  email,
  password,
  name,
  mobileNo,
  country,
  curriculumId,
  gradeId,
}: Student) {
  // console.log(process.env); // Debugging line to see if environment variables are loaded

  try {
    const hashedPassword = await HashPassword({ password: password });
    const createdData = await prisma.student.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        mobileNo: mobileNo,
        country: country,
        curriculumId: curriculumId,
        gradeId: gradeId,
      },
    });

    return {
      msg: "Student created successfully",
      student: createdData, // Optionally return the created student data
    };
  } catch (error: any) {
    // throw new Error(`Something went wrong ${error}`);
    throw error;
  }
}

async function StudentLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("Invalid Email or Password");
  }

  const student = await prisma.student.findUnique({
    where: { email },
  });

  if (!student) {
    throw new Error("Invalid User");
  }

  const verifyPassword = await bcrypt.compare(password, student.password);

  if (!verifyPassword) {
    throw new Error("Invalid Username or Password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT is not configured");
  }

  const token = jwt.sign(
    {
      id: student.id,
      email: student.email,
    },
    process.env.JWT_SECRET
  );

  return {
    msg: "Login successful",
    token,
  };
}

async function StudentData({ skip, take }: { skip: number; take: number }) {
  try {
    const result = await prisma.student.findMany({
      skip: skip,
      take: take,
    });
    return result;
  } catch (err) {
    if (err) throw err;
    else throw new Error("Something went wrong!!");
  }
}

async function StudentDashboardData({ id }: { id: string }) {
  try {
    const enrollment = await prisma.enrollment.count({
      where: {
        studentId: id
      }
    })
    const Assignment = await prisma.studentAssignment.count({
      where: {
        studentId: id
      }
    })
    const AvgMarks = await prisma.assignmentSubmitGrade.aggregate({
      _avg: {
        marks: true
      },
      where: {
        assignmentSubmit: {
          studentassignment: {
            studentId: id
          }
        }
      }
    })
    return { enrollment, Assignment, AvgMarks }
  } catch (err) {
    throw err
  }

}
export { StudentLogin, StudentSignUp, StudentData, StudentDashboardData };
