import express from "express";
import { Get, Create } from "../services/curriculumService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { upload } from "../utils/uploadfile";
import { z } from "zod";
const curriculumRouter = express.Router();

const addSchema = z.object({
  name: z.string(),
  description: z.string()
})
curriculumRouter.post(
  "/add",
  AuthAdmin,
  upload.single("file"),
  async (req, res) => {
    const { name, description } = req.body;
    try {
      const validateSchema = addSchema.safeParse({ name, description })
      if (!validateSchema.success) {
        res.status(403).json({
          msg: 'Invalid Inputs!!'
        })
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
  }
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

export default curriculumRouter;
