import express from "express";
import { AuthStudent } from "../middlewares/studentauthmiddleware";
import { upload } from "../utils/uploadfile";
import {
  GetSubmittedAssignment,
  MarksForAssignment,
  SubmitAssignment,
} from "../services/assignmentSubmitService";
import { AuthTeacher } from "../middlewares/teacherauthmiddleware";
import ExtractId from "../utils/extractIdfromToken";
import { number, string, z } from "zod";
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
const gradeSchema = z.object({
  assignmentSubmitId: z.string(),
  marks: z.number().max(100, `cannot have more then 100 marks`).min(0, `cannot have less then 0`)
})
AssignmentSubmitRouter.post("/grade", AuthTeacher, async (req, res) => {
  const { assignmentSubmitId, marks } = req.body
  try {
    const validateSchema = gradeSchema.safeParse({ assignmentSubmitId, marks })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`
      })
    }
    else {

      const data = await MarksForAssignment({ assignmentSubmitId, marks })
      res.status(200).json({
        msg: ` Marks Submitted Successfully`
      })
    }
  } catch (err) {
    console.log(err)
    res.status(403).json({
      msg: `Unable assign marks`
    })
  }
})

export default AssignmentSubmitRouter;
