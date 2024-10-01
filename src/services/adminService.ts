require("dotenv").config();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
interface admin {
  email: string,
  password: string
}
export async function AdminSignIn({ email, password }: admin) {
  if (!email || !password) {
    throw new Error("Incorrect Email or Password")
  }
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email
      }
    })
    if (!admin) {
      throw new Error("wrong creadentials")
    }
    const verifyPassword = await bcrypt.compare(
      password,
      admin.password
    );
    if (!verifyPassword) {
      throw new Error("Wrong Creadentials")
    }
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET || "MYsuperSECREATpassword" // Optional: Token expiration time
    );

    return token
  } catch (err: any) {
    if (err.message) {
      throw err
    } else {
      throw new Error("Something went wrong!!!")
    }
  }
}
