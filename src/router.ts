import express from "express"
import teacherRouter from "./routes/teacherRoutes"
import studentRouter from "./routes/studentRoutes"
import adminRouter from "./routes/adminRoutes"

const mainRouter = express.Router()

mainRouter.use('/teacher', teacherRouter)
mainRouter.use('/student', studentRouter)
mainRouter.use('/admin', adminRouter)

export default mainRouter
