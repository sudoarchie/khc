import express from "express";
import {
  TeacherDataForAdmin,
  TeacherLogin,
  TeacherSignUp,
} from "../services/teacherService";
import { z } from "zod";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
const teacherRouter = express.Router();

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobileNo: z.string(),
  password: z.string().min(8, `Password length must greater then 8`),
});
teacherRouter.post("/signup", async (req, res) => {
  const { name, mobileNo, email, password } = req.body;
  try {
    const validateSchema = signupSchema.safeParse({
      name,
      mobileNo,
      email,
      password,
    });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs`,
      });
    } else {
      const response = await TeacherSignUp({ name, email, mobileNo, password });
      res.status(200).json({
        msg: response.msg,
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, `Lenght of string must be greater then 8`),
});
teacherRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const verifySchema = loginSchema.safeParse({ email, password });
    if (!verifySchema.success) {
      res.status(403).json({
        msg: `Invalid Schema`,
      });
    } else {
      const token = await TeacherLogin({ email, password });
      res.cookie("teachertoken", token);
      res.status(200).json({
        msg: "Login Successful!!",
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: err,
    });
  }
});
teacherRouter.get("/all", AuthAdmin, async (req, res) => {
  const take = parseInt(req.query.take as string);
  try {
    const data = await TeacherDataForAdmin(take);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: "Unable to fetch teacher data!!",
    });
  }
});

export default teacherRouter;
