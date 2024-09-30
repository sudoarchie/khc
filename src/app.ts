import express from "express";
import teacherRouter from "./routes/teacherRoutes";
import studentRouter from "./routes/studentRoutes";
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("hi there");
});
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);

app.listen(3000, () => {
  console.log(`http://localhost:${port}`);
});
