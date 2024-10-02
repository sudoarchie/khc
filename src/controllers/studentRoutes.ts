import express from "express";
import { StudentLogin, StudentSignUp } from "../services/studentService";

const studentRouter = express.Router();

studentRouter.post("/signup", async (req, res) => {
  const { email, mobileNo, name, password, country } = req.body
  try {

    const token = await StudentSignUp({ email, mobileNo, name, password, country });
    res.status(200).json({
      msg: "Account created Successfully",
    })
  } catch (err) {
    res.status(400).json({
      msg: err
    })
  }
});

studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await StudentLogin({ email, password });
    res.status(200).json({
      msg: "Login Successfully",
      token: token
    })
  } catch (err) {
    res.status(403).json({
      msg: err
    })
  }

});

export default studentRouter;
