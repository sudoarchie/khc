import express from "express";
import {
  TeacherDataForAdmin,
  TeacherLogin,
  TeacherProfile,
  TeacherSignUp,
  TeacherSubject,
} from "../services/teacherService";
import { z } from "zod";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { AuthTeacher } from "../middlewares/teacherauthmiddleware";
import ExtractId from "../utils/extractIdfromToken";
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

teacherRouter.get("/get", AuthAdmin, async (req, res) => {
  const id = req.query.id as string;
  try {
    const response = await TeacherProfile(id);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: `Error while fetching the profile`,
    });
  }
});

teacherRouter.post("/subject", AuthTeacher, async (req, res) => {
  const { subjectId } = req.body;
  const token = req.cookies.teachertoken.token;
  try {
    const teacherId = ExtractId({ token });
    const data = await TeacherSubject({ subjectId, teacherId });
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: error,
    });
  }
});

export default teacherRouter;
