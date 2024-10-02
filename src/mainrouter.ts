import express from "express"
import teacherRouter from "./controllers/teacherControllers"
import studentRouter from "./controllers/studentControllers"
import adminRouter from "./controllers/adminControllers"

const mainRouter = express.Router()

mainRouter.use('/teacher', teacherRouter)
mainRouter.use('/student', studentRouter)
mainRouter.use('/admin', adminRouter)

export default mainRouter
