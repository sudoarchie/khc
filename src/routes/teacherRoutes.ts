import express from 'express'
import { TeacherSignIn, TeacherSignUp } from '../services/teacherService'

const teacherRouter = express.Router()

teacherRouter.post("/signup", TeacherSignUp)
teacherRouter.post("/signin", TeacherSignIn)
export default teacherRouter
