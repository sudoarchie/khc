import express from "express"
import { AdminSignIn } from "../services/adminService";

const adminRouter = express.Router();
adminRouter.post("/login", async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {

    const token = await AdminSignIn({ email, password })
    console.log(token)
    res.cookie("token", token)
    res.status(200).json({
      msg: "Login Successful!!"
    })
  } catch (err: any) {
    res.status(401).json({
      msg: err.message
    })
  }
})
export default adminRouter
