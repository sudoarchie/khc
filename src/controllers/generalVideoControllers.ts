import express from 'express'
import { z } from 'zod'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { upload } from '../utils/uploadfile'
import { PostGeneralVideos } from '../services/generalVideoService'
const generalVideoRouter = express.Router()
const postSchema = z.object({
  name: z.string(),
  discription: z.string(),
})
generalVideoRouter.post('/', AuthAdmin, upload.single("file"), async (req, res) => {
  const { name, discription } = req.body
  try {
    const validateSchema = postSchema.safeParse({ name, discription })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input!!`
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

      const data = await PostGeneralVideos({ name, discription, url })
      res.status(200).json({
        msg: `data send successfully!!`,
        data: data
      })
    }
  } catch (err) {
    console.log(err)
    res.status(403).json({
      msg: `Unable to post video!!`
    })
  }
})

generalVideoRouter.get('/', async (req, res) => {
  const { take, skip } = req.query
  try {

  } catch (error) {

  }
})



export default generalVideoRouter
