import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function StudentSignUp(req: Request, res: Response) {
  console.log(process.env); // Debugging line to see if environment variables are loaded
  const data = req.body;

  try {
    const hashedPassword = await HashPassword({ password: data.password });
    const createdData = await prisma.student.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        mobileNo: data.mobileNo,
        country: data.country,
      },
    });

    res.status(200).json({
      msg: "Student created successfully",
      student: createdData, // Optionally return the created student data
    });
  } catch (error: any) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message || error, // Log the error for debugging
    });
  }
}

async function StudentSignIn(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Email and Password not found",
    });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(401).json({
        msg: "Username does not exist",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      student.password
    );

    if (!verifyPassword) {
      return res.status(401).json({
        msg: "Incorrect Password",
      });
    } else {
      // Ensure JWT_SECRET is set
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          msg: "JWT secret is not configured",
        });
      }

      const token = jwt.sign(
        {
          id: student.id,
          email: student.email,
        },
        process.env.JWT_SECRET || "MYsuperSECREATpassword" // Optional: Token expiration time
      );

      return res.status(200).json({
        msg: "Login successful",
        token, // Return the generated token
      });
    }
  } catch (error: any) {
    res.status(500).json({
      msg: "Something went wrong",
      err: error.message || error,
    });
    console.log(error);
  }
}
export { StudentSignIn, StudentSignUp };
