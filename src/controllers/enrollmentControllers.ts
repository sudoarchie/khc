import express from 'express'
import { z } from 'zod'
import { Enroll } from '../services/enrollmentService'
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

export default enrollmentRouter
