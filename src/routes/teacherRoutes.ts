import express from "express";
import { TeacherSignIn, TeacherSignUp } from "../services/teacherService";

const teacherRouter = express.Router();

teacherRouter.post("/signup", (req, res) => {
  TeacherSignUp(req, res);
});

teacherRouter.post("/signin", (req, res) => {
  TeacherSignIn(req, res);
});

export default teacherRouter;
