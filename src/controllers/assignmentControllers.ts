import express from "express";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { AuthStudent } from "../middlewares/studentauthmiddleware";
import {
  AddAssignment,
  AllAssignmentByAdmin,
  AssignmentDetail,
  AssignStudent,
  GetAssignment,
  SpecialAssignment,
} from "../services/assignmentService";
import ExtractId from "../utils/extractIdfromToken";
import { AuthTeacher } from "../middlewares/teacherauthmiddleware";
import { upload } from "../utils/uploadfile";
import { z } from "zod";

const AssignmentRouter = express.Router();

AssignmentRouter.get("/", AuthStudent, async (req, res) => {
  try {
    const take = parseInt(req.query.take as string);
    const data = req.cookies.studenttoken;
    const token = data;
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

const AssignmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  subjectId: z.string(),
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
      const InputValidate = AssignmentSchema.safeParse({
        name,
        description,
        subjectId,
      });
      if (!InputValidate.success) {
        res.status(403).json({
          msg: "Invalid Inputs!!",
        });
      } else {
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
      }
    } catch (err: any) {
      // Log the error for debugging
      console.error(err);

      // Respond with the error message
      res.status(500).json({
        msg: "Error while creating new assignment",
        error: err.message, // Include error details
      });
    }
  },
);

const SubjectSchemea = z.string();
AssignmentRouter.get("/special", AuthTeacher, async (req, res) => {
  try {
    const { subjectId } = req.body;
    const validateSubject = SubjectSchemea.safeParse(subjectId);
    if (!validateSubject.success) {
      res.status(403).json({
        msg: "Invalid Input!!",
      });
    } else {
      const data = await SpecialAssignment({ subjectId });
      res.status(200).json({
        data,
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Cannot fetch ${err}`,
    });
  }
});

const AssignmentAddTeacher = z.object({
  name: z.string(),
  description: z.string(),
  subjectId: z.string(),
  studentId: z.string(),
  deadline: z.string().date(),
});
AssignmentRouter.post(
  "/addbyteacher",
  AuthTeacher,
  upload.single("file"),
  async (req, res) => {
    try {
      const { name, description, subjectId, studentId, deadline } = req.body;
      const token = req.cookies.teachertoken.token;

      const validate = AssignmentAddTeacher.safeParse({
        name,
        description,
        subjectId,
        studentId,
        deadline,
      });

      if (!validate.success) {
        res.status(403).json({
          msg: `Invalid Inputs!!`,
        });
      } else {
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
        const teacherId = ExtractId({ token });
        const newData = await AssignStudent({
          studentId,
          assignmentId,
          teacherId,
          deadline,
        });
        res.status(200).json({
          msg: `Assignment assigned to Student`,
        });
      }
    } catch (err) {
      res.status(403).json({
        msg: `Error while creating new assignment`,
      });
    }
  },
);
const AssignSchema = z.object({
  assignmentId: z.string(),
  studentId: z.string(),
  deadline: z.string().date(),
});
AssignmentRouter.post("/assign", AuthTeacher, async (req, res) => {
  try {
    const { assignmentId, studentId, deadline } = req.body;

    const token = req.cookies.teachertoken.token;

    const validateSchema = AssignSchema.safeParse({
      assignmentId,
      studentId,
      deadline,
    });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const teacherId = ExtractId({ token });
      const data = await AssignStudent({
        studentId,
        assignmentId,
        teacherId,
        deadline,
      });
      res.status(200).json({
        msg: `Assigned to Student`,
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Error while Assigning to student`,
    });
  }
});

AssignmentRouter.get("/all", AuthAdmin, async (req, res) => {
  const take = parseInt(req.query.take as string);
  try {
    const response = await AllAssignmentByAdmin(take);
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      msg: "Unable to get data!!",
    });
  }
});

AssignmentRouter.get("/details", AuthAdmin, async (req, res) => {
  const take = parseInt(req.query.take as string);
  const id = req.query.id as string;
  try {
    const response = await AssignmentDetail({ id, take });
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(403).json({
      msg: `Unable to fetch data!!`,
    });
  }
});

export default AssignmentRouter;
