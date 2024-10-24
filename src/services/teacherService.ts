import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface teacher {
  name: string,
  email: string,
  mobileNo: string
  password: string
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
    return ({
      msg: "Account created successful"
    })
  } catch (error: any) {
    if (error)
      throw error
    else
      throw new Error("Something went wrong")
  }
}

interface teacherSignIn {
  email: string,
  password: string
}

async function TeacherLogin({ email, password }: teacherSignIn) {


  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: email,
      },
    });

    if (!teacher) {
      throw new Error("Username does not exist")
    }

    const verifyPassword = await bcrypt.compare(
      password,
      teacher.password
    );

    if (!verifyPassword) {
      throw new Error("Incorrect Password")
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
        process.env.JWT_SECRET || "MYsuperSECREATpassword" // Optional: Token expiration time
      );


      return ({
        msg: "Login Successful",
        token
      })
    }
  } catch (error: any) {
    if (error.message) {
      return error
    } else {
      throw new Error(error)
    }
  }
}
export { TeacherLogin, TeacherSignUp };
