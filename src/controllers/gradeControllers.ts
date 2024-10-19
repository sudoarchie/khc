import express from "express";
import { z } from "zod";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { CreateGrade, GetAllGrades } from "../services/gradeService";
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
const dataSchema = z.number();
gradeRouter.get("/data", async (req, res) => {
  try {
    const { take } = req.body;
    const validateSchema = dataSchema.safeParse(take);
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs!!`,
      });
    } else {
      const data = await GetAllGrades({ take });
      res.status(403).json({
        data,
      });
    }
  } catch (err) {
    res.status(403).json({
      msg: `Failed while fetching data!!`,
    });
  }
});

// gradeRouter.get("/dataCurriculumwise",async (req,res)=>{
//     const {curriculumId} = req.body

// })

export default gradeRouter;
