import express from "express";
import { StudentSignIn, StudentSignUp } from "../services/studentService";

const studentRouter = express.Router();

studentRouter.post("/signup", (req, res) => {
  StudentSignUp(req, res);
});

studentRouter.post("/signin", (req, res) => {
  StudentSignIn(req, res);
});

export default studentRouter;
