import express from 'express'
import { z } from 'zod'
import { CreateCourse, GetAllCourse } from '../services/courseService'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { upload } from '../utils/uploadfile'
const courseRouter = express.Router()

const addScheam = z.object({
  name: z.string(),
  description: z.string(),
  subjectId: z.string(),
  price: z.string()
})
courseRouter.post('/add', AuthAdmin, upload.single("file"), async (req, res) => {
  const { name, description, subjectId, price } = req.body
  try {
    const validateSchema = addScheam.safeParse({ name, description, subjectId, price })

    let newprice = parseInt(price)
    console.log(validateSchema.error)
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`
      })
    } else {
      if (!req.file) {
        res.status(400).json({
          msg: "No file uploaded",
        });
        return;
      }
      const file = req.file as Express.MulterS3.File;
      const thumbnail = file.location;


      const data = await CreateCourse({ name, description, subjectId, price: newprice, thumbnail })
      res.status(403).json({
        msg: `Course Created!!`
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: `Unable to Create course`
    })
  }
})

courseRouter.get('/', async (req, res) => {
  try {
    const data = await GetAllCourse()
    res.status(200).json({
      data
    })
  } catch (err) {
    console.log(err)
    res.status(403).json({
      msg: `Unable to fetch Course!!`
    })
  }
})

export default courseRouter
