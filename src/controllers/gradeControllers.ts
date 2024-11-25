import express from "express";
import { z } from "zod";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import {
  CreateGrade,
  DeleteGrade,
  GetAllGrades,
  GetGradeByCurriculum,
} from "../services/gradeService";
const gradeRouter = express.Router();
const addSchema = z.object({
  name: z.string(),
  curriculumId: z.string(),
});
gradeRouter.post("/add", AuthAdmin, async (req, res) => {
  const { name, curriculumId } = req.body;
  try {
    const validateSchema = addSchema.safeParse({
      name,
      curriculumId,
    });
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs`,
      });
    } else {
      const add = await CreateGrade({ name, curriculumId });
      res.status(200).json({
        msg: `Grade Create successfully!!`,
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Failed while creating grade!!`,
    });
  }
});
gradeRouter.get("/data", async (req, res) => {
  try {
    const take = parseInt(req.query.take as string);
    const data = await GetAllGrades({ take });
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      msg: `Failed while fetching data!!`,
    });
  }
});

const dataCurriculumwiseSchema = z.string();
gradeRouter.get("/datacurriculumwise", async (req, res) => {
  const curriculumId = req.query.curriculumId as string;
  try {
    const validateSchema = dataCurriculumwiseSchema.safeParse(curriculumId);
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const data = await GetGradeByCurriculum({ curriculumId });
      res.status(200).json({
        data,
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Error while fetching data`,
    });
  }
});
gradeRouter.delete("/delete", AuthAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const data = await DeleteGrade({ id });
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(403).json({
      msg: `Failed while deleting grade`,
    });
  }
});

export default gradeRouter;
