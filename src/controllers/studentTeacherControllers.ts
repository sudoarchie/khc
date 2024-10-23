import express from 'express'
import { AuthAdmin } from '../middlewares/adminauthmiddleware';
import { z } from 'zod';
import { AssignTeacher } from '../services/studentTeacherService';
const StudentTeacherRouter = express.Router();

const createSchema = z.object({
  studentId: z.string(),
  teacherId: z.string(),
  timing: z.string()
})
StudentTeacherRouter.post('/', AuthAdmin, async (req, res) => {
  const { studentId, teacherId, timing } = req.body
  try {
    const validateSchema = createSchema.safeParse({ studentId, teacherId, timing })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input!!`
      })
    } else {
      const data = await AssignTeacher({ studentId, teacherId, timing })
      res.status(200).json({
        msg: `Teacher assigned to teacher!`
      })
    }
  } catch (err) {
    res.status(403).json({
      msg: `Unable to assign teacher to student`
    })
  }
})

export default StudentTeacherRouter
