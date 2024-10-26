import express from 'express'
import { z } from 'zod'
import { CreateCourse, DeleteCourse, GetAllCourse, UpdateCourse } from '../services/courseService'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { upload } from '../utils/uploadfile'
import { AuthStudent } from '../middlewares/studentauthmiddleware'
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
      res.status(200).json({
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

courseRouter.delete('/', AuthAdmin, async (req, res) => {
  const { id } = req.body
  try {
    const data = await DeleteCourse({ id })
    res.status(200).json({
      msg: `Course deleted!!`
    })
  } catch (error) {
    res.status(403).json({
      msg: `Unable to delete course!!`
    })
  }
})

courseRouter.put('/', AuthAdmin, upload.single("file"), async (req, res) => {

  let { id, name, description, thumbnail, subjectId, price } = req.body
  try {
    const validateSchema = addScheam.safeParse({ name, description, subjectId, price })
    let newprice = parseInt(price)
    console.log(validateSchema.error)
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input`
      })
    } else {
      if (!thumbnail) {
        if (req.file) {
          const file = req.file as Express.MulterS3.File;
          thumbnail = file.location;
        }
      }
      const data = UpdateCourse({ id, name, description, thumbnail, subjectId, price: newprice })
      res.status(200).json({
        msg: `Course Updated!!`
      })
    }

  } catch (err) {
    console.log(err)
    res.status(403).json({
      msg: `Unable to Update Course`
    })

  }
})

export default courseRouter
