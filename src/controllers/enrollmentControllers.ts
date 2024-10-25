import express from 'express'
import { z } from 'zod'
import { Enroll, GetCourse, StudentList } from '../services/enrollmentService'
import ExtractId from '../utils/extractIdfromToken'
import { AuthTeacher } from '../middlewares/teacherauthmiddleware'
const enrollmentRouter = express.Router()
const enroll = z.object({
  studentId: z.string(),
  teacherId: z.string(),
  subjectId: z.string(),
  transactionId: z.string(),
  videoAllow: z.boolean(),
  timing: z.string().time(),
  durationInHr: z.number(),
  expireDate: z.string().date()
})
enrollmentRouter.post('/', async (req, res) => {
  const { studentId, teacherId, subjectId, transactionId, videoAllow, timing, durationInHr, expireDate } = req.body
  try {
    const validateSchema = enroll.safeParse({ studentId, teacherId, subjectId, transactionId, videoAllow, timing, durationInHr, expireDate });

    if (!validateSchema.success) {
      res.status(403).json({
        msg: "Invalid Input",
        errors: validateSchema.error.errors  // Include specific validation errors
      });
    }
    else {
      const data = await Enroll({ studentId, teacherId, subjectId, transactionId, videoAllow, timing, durationInHr, expireDate })
      res.status(200).json({
        msg: `Student enrolled successfully!!`,

      })
    }
  } catch (err) {
    res.status(403).json({
      msg: `Unable to enroll student!!`
    })
  }
})

enrollmentRouter.get('/', async (req, res) => {
  const token = req.cookies.studenttoken
  try {
    const studentId = ExtractId({ token })
    console.log(studentId)
    const course = await GetCourse({ studentId })
    res.status(200).json({
      course
    })
  } catch (err) {
    res.status(403).json({
      msg: `Unable to Fetch courses!`
    })
  }
})

enrollmentRouter.get('/studentlist', AuthTeacher, async (req, res) => {
  const token = req.cookies.teachertoken.token;
  console.log(token)
  const teacherId = ExtractId({ token })
  try {
    const data = await StudentList({ teacherId })
    res.status(200).json({
      data
    })
  } catch (err) {
    res.status(403).json({
      msg: `Unable to fetch student list!!`
    })
  }
})
export default enrollmentRouter
