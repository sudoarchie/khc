import express from "express"
import { AdminSignIn } from "../services/adminService";

const adminRouter = express.Router();
adminRouter.post("/signin", (req, res) => {
  AdminSignIn(req, res)
})
export default adminRouter
