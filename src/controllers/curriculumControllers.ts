import express from "express";
import {
  Get,
  Create,
  GetList,
  DeleteCurriculum,
} from "../services/curriculumService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { upload } from "../utils/uploadfile";
import { z } from "zod";
import { TagCountry } from "../services/countryService";
const curriculumRouter = express.Router();

const addSchema = z.object({
  name: z.string({ message: "Invalid Name" }),
  description: z.string({ message: "Invalid description" }),
  countryId: z.array(z.string({ message: "Invalid Country!!" }).min(6)),
});
curriculumRouter.post(
  "/add",
  AuthAdmin,
  upload.single("file"),
  async (req, res) => {
    const { name, description, countryId } = req.body;
    try {
      const validateSchema = addSchema.safeParse({
        name,
        description,
        countryId,
      });
      if (!validateSchema.success) {
        res.status(403).json({
          msg: validateSchema.error,
        });
      } else {
        if (!req.file) {
          res.status(400).json({
            msg: "No file uploaded",
          });
          return;
        }

        const file = req.file as Express.MulterS3.File;
        const logoUrl = file.location;

        const data = await Create({ name, description, logoUrl });
        countryId.map(async (country: string) => {
          const assign = await TagCountry({
            countryId: country,
            curriculumId: data.curriculum.id,
          });
        });
        res.status(200).json({
          msg: data.msg,
          data: data.curriculum,
        });
      }
    } catch (err) {
      res.status(403).json({
        msg: err instanceof Error ? err.message : "An unknown error occurred",
      });
    }
  },
);

curriculumRouter.get("/data", async (req, res) => {
  try {
    const data = await Get();
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(403).json({
      msg: err instanceof Error ? err.message : "Something went wrong!!",
    });
  }
});

curriculumRouter.get("/list", async (req, res) => {
  try {
    const data = await GetList();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({
      msg: error,
    });
  }
});

curriculumRouter.delete("/delete", AuthAdmin, async (req, res) => {
  const { id } = req.body;
  try {
    const data = await DeleteCurriculum({ id });
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      msg: `Failed while deleting curriculum`,
    });
  }
});

export default curriculumRouter;
