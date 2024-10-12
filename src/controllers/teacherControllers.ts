import express from "express";
import { TeacherLogin, TeacherSignUp } from "../services/teacherService";

const teacherRouter = express.Router();

teacherRouter.post("/signup", async (req, res) => {
  const { name, firstName, secondName, thirdName, email, password } = req.body
  try {

    const response = await TeacherSignUp({ name, firstName, secondName, thirdName, email, password });
    res.status(200).json({
      msg: response.msg
    })
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
