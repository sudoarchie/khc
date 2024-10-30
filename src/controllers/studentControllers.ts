import express from "express";
import {
  StudentData,
  StudentLogin,
  StudentSignUp,
} from "../services/studentService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";
import { AuthStudent } from "../middlewares/studentauthmiddleware";
import ExtractId from "../utils/extractIdfromToken";
const studentRouter = express.Router();

const signupSchema = z.object({
  email: z.string().email(),
  mobileNo: z.number(),
  name: z.string(),
  password: z.string().min(8, "Password cannot be less then 8 letters"),
  country: z.string(),
  curriculumId: z.string(),
  gradeId: z.string(),
});
studentRouter.post("/signup", async (req, res) => {
  const { email, mobileNo, name, password, country, curriculumId, gradeId } =
    req.body;
  try {
    const validateSchema = signupSchema.safeParse({
      email,
      mobileNo,
      name,
      password,
      country,
      curriculumId,
      gradeId,
    });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input `,
      });
    } else {
      const token = await StudentSignUp({
        email,
        mobileNo,
        name,
        password,
        country,
        curriculumId,
        gradeId,
      });
      res.status(200).json({
        msg: "Account created Successfully",
      });
    }
  } catch (err: any) {
    res.status(400).json({
      msg: err.message || "Something went wrong!",
    });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password length should be greater then 8"),
});
studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const validateSchema = loginSchema.safeParse({ email, password });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const result = await StudentLogin({ email, password });
      res.cookie("studenttoken", result.token);
      res.status(200).json({
        msg: result.msg,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(403).json({
        msg: err.message,
      });
    } else {
      res.status(500).json({
        msg: "An unexpected error occurred",
      });
    }
  }
});

studentRouter.get("/data", AuthAdmin, async (req, res) => {
  const { take } = req.body;
  const skip = take - 10;
  try {
    const data = await StudentData({ skip, take });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(403).json({
      msg: err || "Something went wrong!",
    });
  }
});

studentRouter.get('/validate', (req, res) => {

  const token = req.cookies.studenttoken
  if (!token) {
    res.status(403).json({
      validate: false
    })
  }
  else {
    const id = ExtractId({ token })
    res.status(200).json({
      validate: true,
    })
  }
})

export default studentRouter;
