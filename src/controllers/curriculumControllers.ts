import express from 'express'
import { Get, Create } from '../services/curriculumService'
const curriculumRouter = express.Router();
curriculumRouter.get("/data", (req, res) => {

})

curriculumRouter.post('/add', async (req, res) => {
  const { name, description, logoUrl } = req.body
  try {
    const data = await Create({ name, description, logoUrl })
    res.status(200).json({
      msg: data.msg,
      data: data.curriculum
    })
  } catch (err) {
    res.status(403).json({
      msg: err
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
      msg: err || `Something went wrong!!`
    })
  }
})

export default curriculumRouter
