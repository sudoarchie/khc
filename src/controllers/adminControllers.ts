import express from "express"
import { AdminSignIn } from "../services/adminService";
import { z } from 'zod'
const adminRouter = express.Router();
const adminSchema = z.object({
  email: z.string().email(`Invalid email formate`),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

adminRouter.post("/login", async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const data = adminSchema.safeParse({ email, password })
    if (!data.success) {
      console.log(`Invalid Input`)
      res.status(403).json({
        msg: `Invalid Input`
      })
    } else {

      const token = await AdminSignIn({ email, password })
      console.log(token)
      res.cookie("admintoken", token)
      res.status(200).json({
        msg: "Login Successful!!"
      })

    }
  } catch (err: any) {
    res.status(401).json({
      msg: err.message
    })
  }
})
export default adminRouter
