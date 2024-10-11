import express from "express"
import teacherRouter from "./controllers/teacherControllers"
import studentRouter from "./controllers/studentControllers"
import adminRouter from "./controllers/adminControllers"
import curriculumRouter from "./controllers/curriculumControllers"
import subjectRouter from "./controllers/subjectControllers"

const mainRouter = express.Router()

mainRouter.use('/teacher', teacherRouter)
mainRouter.use('/student', studentRouter)
mainRouter.use('/admin', adminRouter)
mainRouter.use('/curriculum', curriculumRouter)
mainRouter.use('/subject', subjectRouter)
export default mainRouter
