import express from "express"
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";

import { upload } from "../utils/uploadfile";
import { CreateBlog, DeleteBlog, GetBlog, UpdateBlog } from "../services/blogService";
import { title } from "process";
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

BlogRouter.get('/', async (req, res) => {
  const take = req.body
  try {
    const data = await GetBlog(take)
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(403).json({
      msg: `Unable to fetch blogs!!`
    })
  }
})

BlogRouter.delete('/', AuthAdmin, async (req, res) => {
  const { id } = req.body
  try {
    const del = await DeleteBlog({ id })
    res.status(200).json({
      msg: `Blog Deleted Successfully`
    })
  } catch (error) {
    res.status(403).json({
      msg: `Unable to delete blog`
    })
  }
})
const BlogUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string()
})
BlogRouter.put('/', AuthAdmin, upload.single("file"), async (req, res) => {
  const { id, title, description } = req.body
  try {
    const validateSchema = BlogUpdateSchema.safeParse({ id, title, description })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Inputs`
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

      const update = await UpdateBlog({ id, title, description, url })
      res.status(200).json({
        msg: `Blog Updated Successfully!!`
      })
    }
  } catch {
    res.status(403).json({
      msg: `Unable to Update Blog!!`
    })
  }
})
export default BlogRouter
