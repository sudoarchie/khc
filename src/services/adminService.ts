import { Request, Response } from "express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
export async function AdminSignIn(req: Request, res: Response) {
  const body = req.body
  if (!body.email || !body.password) {
    res.status(401).json({
      msg: "Email or Password not found!!!"
    })
  }
  try {

    const admin = await prisma.admin.findUnique({
      where: {
        email: body.email
      }
    })

    if (!admin) {
      return res.status(401).json({
        msg: "Wrong Credentials!!"

      })
    }
    const verifyPassword = await bcrypt.compare(
      body.password,
      admin.password
    );
    if (!verifyPassword) {
      return res.status(401).json({
        msg: "Incorrect Email or Password"
      })
    }
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET || "MYsuperSECREATpassword" // Optional: Token expiration time
    );
    res.status(200).json({
      msg: "Login Successful",
      token
    })
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
      err
    })
  }
}
