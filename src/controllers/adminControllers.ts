import express from "express";
import { AdminDashboard, AdminSignIn } from "../services/adminService";
import { z } from "zod";
import ExtractId from "../utils/extractIdfromToken";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
const adminRouter = express.Router();
const adminSchema = z.object({
  email: z.string().email(`Invalid email formate`),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

adminRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const data = adminSchema.safeParse({ email, password });
    if (!data.success) {
      console.log(`Invalid Input`);
      res.status(403).json({
        msg: `Invalid Input`,
      });
    } else {
      const token = await AdminSignIn({ email, password });
      console.log(token);
      res.cookie("admintoken", token);
      res.status(200).json({
        msg: "Login Successful!!",
      });
    }
  } catch (err: any) {
    res.status(401).json({
      msg: err.message,
    });
  }
});
adminRouter.get("/validate", (req, res) => {
  const token = req.cookies.admintoken;
  console.log(token);
  if (!token) {
    res.status(403).json({
      validate: false,
    });
  } else {
    const id = ExtractId({ token });
    res.status(200).json({
      validate: true,
      id,
    });
  }
});

adminRouter.get("/dashboard", AuthAdmin, async (req, res) => {
  try {
    const data = await AdminDashboard();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({
      msg: error,
    });
  }
});
export default adminRouter;
