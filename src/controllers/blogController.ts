import express from "express"
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";

import { upload } from "../utils/uploadfile";
import { CreateBlog } from "../services/blogService";
const BlogRouter = express.Router();



const AddSchema = z.object({
  title: z.string(),
  description: z.string()
})
BlogRouter.post('/add', AuthAdmin, upload.single("file"), async (req, res) => {
  const { title, description } = req.body
  try {
    const validateSchema = AddSchema.safeParse({
      title,
      description
    })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs!!`
      })
    } else {
      if (!req.file) {
        res.status(400).json({
          msg: "No file uploaded",
        });
        return;
      }
      const file = req.file as Express.MulterS3.File;
      const url = file.location;

      const data = await CreateBlog({ title, description, url })
      res.status(200).json({
        msg: `Blog Create Successfully!!`,
        data
      })
    }
  } catch (err) {
    res.status(403).json({
      msg: `Unable to create blog!!`
    })
  }
})

export default BlogRouter
