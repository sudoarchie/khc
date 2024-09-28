import express from 'express'
import { TeacherSignUp } from '../services/teacherService'

const teacherRouter = express.Router()

teacherRouter.post("/signup", TeacherSignUp)

export default teacherRouter
