import express from 'express'
import { z } from 'zod'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { upload } from '../utils/uploadfile'
import { Getlatest, PostGeneralVideos } from '../services/generalVideoService'
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
const validateGet = z.object({
  take: z.number(),
  skip: z.number()
})
generalVideoRouter.get('/', async (req, res) => {
  const take = parseInt(req.query.take as string) || 10;
  const skip = parseInt(req.query.skip as string) || 0
  try {
    const validateSchema = validateGet.safeParse({ take, skip })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input!!`
      })
    } else {

      const data = await Getlatest({ take, skip })
      res.status(200).json({
        data
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: `Unable to fetch data!!`
    })
  }
})



export default generalVideoRouter
