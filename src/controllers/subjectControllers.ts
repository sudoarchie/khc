import express from "express";
import {
  CreateSubject,
  DeleteSubject,
  GetSubject,
  UpdateSubject,
} from "../services/subjectService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";
const subjectRouter = express.Router();

subjectRouter.get("/data", async (req, res) => {
  const { curriculumId } = req.body;
  try {
    const data = await GetSubject({ curriculumId });
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
  curriculumId: z.string()
})
subjectRouter.post("/add", AuthAdmin, async (req, res) => {
  try {
    const { name, curriculumId } = req.body;
    const validateSchema = addSchema.safeParse({ name, curriculumId })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`
      })
    } else {

      const data = await CreateSubject({ name, curriculumId });
      res.status(200).json({
        msg: "Subject Created Successfully",
      });
    }
  } catch (error) {
    res.status(403).json({
      msg: `Could not create subject due to ${error}`,
    });
  }
});

const updateSchema = z.object({
  id: z.string(),
  name: z.string(),
  curriculumId: z.string()
})
subjectRouter.post("/update", AuthAdmin, async (req, res) => {
  try {
    const { id, name, curriculumId } = req.body;

    const validateSchema = updateSchema.safeParse({ id, name, curriculumId })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`
      })
    } else {
      const data = await UpdateSubject({ id, name, curriculumId });
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

subjectRouter.delete("/delete", AuthAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const data = await DeleteSubject({ id });
    res.status(200).json({
      msg: `Subject Deleted Successfully`,
    });
  } catch (error) {
    res.status(403).json({
      msg: "something went wrong",
    });
  }
});

export default subjectRouter;
