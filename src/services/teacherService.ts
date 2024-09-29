import { Request, Response, NextFunction } from "express";
require('dotenv').config()
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import HashPassword from "../utils/hashUtils";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function TeacherSignUp(req: Request, res: Response) {
  console.log(process.env)
  const data = req.body;
  try {
    const hashedPassword = await HashPassword({ password: data.password });
    const createdData = await prisma.teacher.create({
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
  } catch (error: any) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message || error, // Log the error for debugging
    });
  }
}

export async function TeacherSignIn(req: Request, res: Response) {
  const data = req.body;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!teacher) {
      return res.status(401).json({
        msg: "Username does not exist",
      });
    }
    const verifyPassword = await bcrypt.compare(
      data.password,
      teacher.password,
    );
    if (!verifyPassword) {
      return res.status(401).json({
        msg: "Incorrect Password",
      });
    } else {
      // const token = jwt.sign(
      //   {
      //     id: teacher.id,
      //     email: teacher.email,
      //   },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "1h" }, // Token expires in 1 hour
      // );
    }
  } catch (error) {
    res.status(401).json({
      msg: "something when wrong",
      err: error,
    });
    console.log(error);
  }
}
