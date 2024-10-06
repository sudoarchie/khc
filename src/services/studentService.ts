import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface Student {
  email: string
  password: string
  name: string
  mobileNo: string
  country: string
}

async function StudentSignUp({ email, password, name, mobileNo, country }: Student) {
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
      },
    });

    return ({
      msg: "Student created successfully",
      student: createdData, // Optionally return the created student data
    });
  } catch (error: any) {
    // throw new Error(`Something went wrong ${error}`);
    throw error
  }
}

async function StudentLogin({ email, password }: { email: string, password: string }) {


  if (!email || !password) {
    throw new Error("Invalid Email or Password")
  }
  try {
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      throw new Error("Invalid User")
    }

    const verifyPassword = await bcrypt.compare(
      password,
      student.password
    );

    if (!verifyPassword) {
      throw new Error("Invalid Username or Password")
    } else {
      // Ensure JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT is not configured")
      }

      const token = jwt.sign(
        {
          id: student.id,
          email: student.email,
        },
        process.env.JWT_SECRET || "MYsuperSECREATpassword" // Optional: Token expiration time
      );

      return {
        msg: "Login successful",
        token, // Return the generated token
      }
    }
  } catch (error: any) {
    if (error.message) {
      return error
    } else {
      console.log(error)
      throw new Error("Something went wrong!!")
    }
  }
}
export { StudentLogin, StudentSignUp };
