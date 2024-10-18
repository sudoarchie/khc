import express from "express";
import { TeacherLogin, TeacherSignUp } from "../services/teacherService";
import { z } from "zod";
const teacherRouter = express.Router();

const signupSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  secoundName: z.string(),
  thirdName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, `Password length must greater then 8`)
})
teacherRouter.post("/signup", async (req, res) => {
  const { name, firstName, secoundName, thirdName, email, password } = req.body
  try {
    const validateSchema = signupSchema.safeParse({ name, firstName, secoundName, thirdName, email, password })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs`
      })
    } else {

      const response = await TeacherSignUp({ name, firstName, secoundName, thirdName, email, password });
      res.status(200).json({
        msg: response.msg
      })
    }
  } catch (err) {
    res.status(400).json({
      msg: err
    })
  }
});

teacherRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {

    const token = await TeacherLogin({ email, password });
    res.cookie("teachertoken", token)
    res.status(200).json({
      msg: "Login Successful!!",
    })
  } catch (err) {
    res.status(403).json({
      msg: err
    })
  }


}

);

export default teacherRouter;
