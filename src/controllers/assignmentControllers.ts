import express from "express";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { AuthStudent } from "../middlewares/studentauthmiddleware";
import {
  AddAssignment,
  AssignStudent,
  GetAssignment,
  SpecialAssignment,
} from "../services/assignmentService";
import ExtractId from "../utils/extractIdfromToken";
import { AuthTeacher } from "../middlewares/teacherauthmiddleware";
import { upload } from "../utils/uploadfile";

const AssignmentRouter = express.Router();

AssignmentRouter.get("/", AuthStudent, async (req, res) => {
  try {
    const { take } = req.body;
    const data = req.cookies.studenttoken;
    const token = data.token;
    const StudentId = ExtractId({ token });
    const fetchedData = await GetAssignment({ StudentId, take });
    res.status(200).json({
      data: fetchedData,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Something went wrong!!`,
    });
  }
});
AssignmentRouter.post(
  "/add",
  AuthAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const { name, description, subjectId } = req.body;
      const visible = true;
      if (!name || !description || !subjectId) {
        res.status(400).json({
          msg: "Missing required fields: name, description, or subjectId",
        });
        return;
      }
      console.log(req.file);
      if (!req.file) {
        res.status(400).json({
          msg: "No file uploaded",
        });
        return;
      }

      const file = req.file as Express.MulterS3.File;
      const url = file.location;
      console.log(url);

      // Add the new assignment to the database
      await AddAssignment({ name, description, url, subjectId, visible });

      // Respond with success
      res.status(200).json({
        msg: "Assignment created successfully",
      });
    } catch (err: any) {
      // Log the error for debugging
      console.error(err);

      // Respond with the error message
      res.status(500).json({
        msg: "Error while creating new assignment",
        error: err.message, // Include error details
      });
    }
  }
);

AssignmentRouter.get("/special", AuthTeacher, async (req, res) => {
  try {
    const { subjectId } = req.body;
    const data = await SpecialAssignment({ subjectId });
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Cannot fetch ${err}`,
    });
  }
});

AssignmentRouter.post("/addbyteacher", AuthTeacher, upload.single('file'), async (req, res) => {
  try {
    const { name, description, subjectId, studentId } = req.body;

    if (!req.file) {
      res.status(400).json({
        msg: "No file uploaded",
      });
      return;
    }
    const file = req.file as Express.MulterS3.File;
    const url = file.location;

    const visible = false;
    const data = await AddAssignment({
      name,
      description,
      url,
      subjectId,
      visible,
    });
    const assignmentId = data.id;
    const newData = await AssignStudent({ studentId, assignmentId });
    res.status(200).json({
      msg: `Assignment assigned to Student`,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Error while creating new assignment`,
    });
  }
});

AssignmentRouter.post("/assign", AuthTeacher, async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body;
    const data = await AssignStudent({ studentId, assignmentId });
    res.status(200).json({
      msg: `Assigned to Student`,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Error while Assigning to student`,
    });
  }
});

export default AssignmentRouter;
