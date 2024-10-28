import express from 'express'
import { CreateEnquire } from '../services/EnquireService';
import { z } from 'zod';

const EnquireRouter = express.Router()

const CreateSchema = z.object({
  email: z.string().email(),
  mobileNo: z.string(),
  message: z.string()
})
EnquireRouter.post('/', async (req, res) => {
  const { email, mobileNo, message } = req.body;
  try {
    const validateSchema = CreateSchema.safeParse({ email, mobileNo, message })
    if (!validateSchema.success) {
      res.status(403).json({
        msg: `Invalid Input!!`
      })
    } else {

      const data = await CreateEnquire({ email, mobileNo, message })
      res.status(200).json({
        msg: `Enquire Sent!!`
      })
    }

  } catch (error) {
    res.status(403).json({
      msg: `Unable to Send Enquiry!!`
    })
  }
})

export default EnquireRouter
