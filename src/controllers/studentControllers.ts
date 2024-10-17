import express from "express";
import {
  StudentData,
  StudentLogin,
  StudentSignUp,
} from "../services/studentService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";
const studentRouter = express.Router();

const signupSchema = z.object({
  email: z.string().email(),
  mobileNo: z.number(),
  name: z.string(),
  password: z.string().min(8, "Password cannot be less then 8 letters"),
  country: z.string(),
  payment: z.boolean(),
  status: z.boolean(),
  videoAllow: z.boolean(),
  curriculumId: z.string()
})
studentRouter.post("/signup", async (req, res) => {
  const {
    email,
    mobileNo,
    name,
    password,
    country,
    payment,
    status,
    videoAllow,
    curriculumId,
  } = req.body;
  try {
    const validateSchema = signupSchema.safeParse({ email, mobileNo, name, password, country, payment, status, videoAllow, curriculumId })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input `
      })
    } else {

      const token = await StudentSignUp({
        email,
        mobileNo,
        name,
        password,
        country,
        payment,
        status,
        videoAllow,
        curriculumId,
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

studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await StudentLogin({ email, password });
    res.cookie("studenttoken", token);
    res.status(200).json({
      msg: "Login Successfully",
    });
  } catch (err) {
    res.status(403).json({
      msg: err,
    });
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

export default studentRouter;
