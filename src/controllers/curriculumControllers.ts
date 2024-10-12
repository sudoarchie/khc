import express from 'express'
import { Get, Create } from '../services/curriculumService'
import { AuthAdmin } from '../middlewares/adminauthmiddleware';

const curriculumRouter = express.Router();

curriculumRouter.post('/add', AuthAdmin, async (req, res) => {
  const { name, description, logoUrl } = req.body
  try {
    const data = await Create({ name, description, logoUrl })
    res.status(200).json({
      msg: data.msg,
      data: data.curriculum
    })
  } catch (err) {
    res.status(403).json({
      msg: err instanceof Error ? err.message : 'An unknown error occurred'
    })
  }
})

curriculumRouter.get('/data', async (req, res) => {
  try {
    const data = await Get()
    res.status(200).json({
      data
    })
  } catch (err) {
    res.status(403).json({
      msg: err instanceof Error ? err.message : 'Something went wrong!!'
    })
  }
})

export default curriculumRouter
