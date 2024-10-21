import express from "express";
import { AuthStudent } from "../middlewares/studentauthmiddleware";
import { upload } from "../utils/uploadfile";
import {
  GetSubmittedAssignment,
  SubmitAssignment,
} from "../services/assignmentSubmitService";
import { AuthTeacher } from "../middlewares/teacherauthmiddleware";
import ExtractId from "../utils/extractIdfromToken";
const AssignmentSubmitRouter = express.Router();

AssignmentSubmitRouter.post(
  "/",
  AuthStudent,
  upload.single("file"),
  async (req, res) => {
    const { studentAssignmentId } = req.body;
    try {
      if (!req.file) {
        res.status(400).json({
          msg: "No file uploaded",
        });
        return;
      }

      const file = req.file as Express.MulterS3.File;
      const SubmitUrl = file.location;

      const data = await SubmitAssignment({ studentAssignmentId, SubmitUrl });
      res.status(200).json({
        data,
      });
    } catch (err) {
      res.status(403).json({
        msg: `Unable to submit Project`,
      });
    }
  }
);

AssignmentSubmitRouter.get("/", AuthTeacher, async (req, res) => {
  const token = req.cookies.teachertoken.token;
  const teacherId = ExtractId({ token });

  try {
    const data = await GetSubmittedAssignment({ teacherId });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({
      msg: `Cannot fetch the data`,
    });
  }
});

export default AssignmentSubmitRouter;
