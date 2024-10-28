import express from 'express'
import { CreateEnquire, GetEnquire } from '../services/EnquireService';
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

EnquireRouter.get("/", async (req, res) => {
  const take = parseInt(req.query.take as string) || 15
  let skip = take - 15;
  if (skip < 0) {
    skip = 0;
  }
  try {
    const data = await GetEnquire({ take, skip })
    res.status(200).json({
      data
    })
  } catch (error) {
    console.log(error)
    res.status(403).json({
      msg: `Unable to Fetch Enquire!!`
    })
  }
})

export default EnquireRouter
