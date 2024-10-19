import express from "express";
import teacherRouter from "./controllers/teacherControllers";
import studentRouter from "./controllers/studentControllers";
import adminRouter from "./controllers/adminControllers";
import curriculumRouter from "./controllers/curriculumControllers";
import subjectRouter from "./controllers/subjectControllers";
import AssignmentRouter from "./controllers/assignmentControllers";
import gradeRouter from "./controllers/gradeControllers";

const mainRouter = express.Router();

mainRouter.use("/teacher", teacherRouter);
mainRouter.use("/student", studentRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/curriculum", curriculumRouter);
mainRouter.use("/subject", subjectRouter);
mainRouter.use("/assignment", AssignmentRouter);
mainRouter.use("/grade", gradeRouter);
export default mainRouter;
