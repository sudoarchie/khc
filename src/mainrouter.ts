import express from "express";
import teacherRouter from "./controllers/teacherControllers";
import studentRouter from "./controllers/studentControllers";
import adminRouter from "./controllers/adminControllers";
import curriculumRouter from "./controllers/curriculumControllers";
import subjectRouter from "./controllers/subjectControllers";
import AssignmentRouter from "./controllers/assignmentControllers";
import gradeRouter from "./controllers/gradeControllers";
import BlogRouter from "./controllers/blogController";
import AssignmentSubmitRouter from "./controllers/assignmentSubmitControllers";
import StudentTeacherRouter from "./controllers/studentTeacherControllers";
import enrollmentRouter from "./controllers/enrollmentControllers";
import courseRouter from "./controllers/courseControllers";
import EnquireRouter from "./controllers/EnquireControllers";

const mainRouter = express.Router();

mainRouter.use("/teacher", teacherRouter);
mainRouter.use("/student", studentRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/curriculum", curriculumRouter);
mainRouter.use("/subject", subjectRouter);
mainRouter.use("/assignment", AssignmentRouter);
mainRouter.use("/grade", gradeRouter);
mainRouter.use('/blog', BlogRouter)
mainRouter.use('/submitassignment', AssignmentSubmitRouter)
mainRouter.use('/studentteacher', StudentTeacherRouter)
mainRouter.use('/enroll', enrollmentRouter)
mainRouter.use('/course', courseRouter)
mainRouter.use('/enquiry', EnquireRouter)
export default mainRouter;
