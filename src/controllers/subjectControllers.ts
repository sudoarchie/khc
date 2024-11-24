import express from "express";
import {
  CreateSubject,
  DeleteSubject,
  GetAllSubjects,
  GetSubject,
  UpdateSubject,
} from "../services/subjectService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";
const subjectRouter = express.Router();

subjectRouter.get("/data", async (req, res) => {
  const gradeId = req.query.gradeId as string;
  try {
    const data = await GetSubject({ gradeId });
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Cannot fetch the data ${err}`,
    });
  }
});
subjectRouter.get("/all", async (req, res) => {
  try {
    const data = await GetAllSubjects();
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Cannot fetch the data ${err}`,
    });
  }
});
const addSchema = z.object({
  name: z.string(),
  gradeId: z.string(),
});
subjectRouter.post("/add", AuthAdmin, async (req, res) => {
  try {
    console.log(1);
    const { name, gradeId } = req.body;
    const validateSchema = addSchema.safeParse({ name, gradeId });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const data = await CreateSubject({ name, gradeId });
      res.status(200).json({
        msg: "Subject Created Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: `Could not create subject due to ${error}`,
    });
  }
});

const updateSchema = z.object({
  id: z.string(),
  name: z.string(),
  gradeId: z.string(),
});
subjectRouter.post("/update", AuthAdmin, async (req, res) => {
  try {
    const { id, name, gradeId } = req.body;

    const validateSchema = updateSchema.safeParse({ id, name, gradeId });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const data = await UpdateSubject({ id, name, gradeId });
      res.status(200).json({
        msg: "Subject Updated Successfully",
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Could not update due to ${err}`,
    });
  }
});
const deleteSchema = z.object({
  id: z.string(),
});
subjectRouter.delete("/delete", AuthAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const validateSchema = deleteSchema.safeParse({ id });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input id`,
      });
    } else {
      const data = await DeleteSubject({ id });
      res.status(200).json({
        msg: `Subject Deleted Successfully`,
      });
    }
  } catch (error) {
    res.status(403).json({
      msg: "something went wrong",
    });
  }
});

export default subjectRouter;
