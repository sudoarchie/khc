import express from "express";
import { StudentData, StudentLogin, StudentSignUp } from "../services/studentService";

const studentRouter = express.Router();

studentRouter.post("/signup", async (req, res) => {
  const { email, mobileNo, name, password, country, payment, status, videoAllow, curriculumId } = req.body
  try {

    const token = await StudentSignUp({ email, mobileNo, name, password, country, payment, status, videoAllow, curriculumId });
    res.status(200).json({
      msg: "Account created Successfully",
    })
  } catch (err: any) {
    res.status(400).json({
      msg: err.message || "Something went wrong!"
    })
  }
});

studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await StudentLogin({ email, password });
    res.cookie("token", token)
    res.status(200).json({
      msg: "Login Successfully",
    })
  } catch (err) {
    res.status(403).json({
      msg: err
    })
  }

});

studentRouter.get("/data", async (req, res) => {
  const { take } = req.body
  const skip = take - 10;
  try {
    const data = await StudentData({ skip, take })
    res.status(200).json({
      data: data
    })
  } catch (err) {
    res.status(403).json({
      msg: err || "Something went wrong!"
    })
  }
})

export default studentRouter;
