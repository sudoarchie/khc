import express from "express";
import { CreateSubject, GetSubject, UpdateSubject } from "../services/subjectService";

const subjectRouter = express.Router()

subjectRouter.get('/data', async (req, res) => {
  try {
    const data = await GetSubject()
    res.status(200).json({
      data: data
    })
  }
  catch (err) {
    res.status(403).json({
      msg: `Cannot fetch the data ${err}`
    })
  }
})

subjectRouter.post('/add', async (req, res) => {
  try {
    const { name, curriculumId } = req.body
    const data = await CreateSubject({ name, curriculumId })
    res.status(200).json({
      msg: 'Subject Created Successfully'
    })
  } catch (error) {
    res.status(403).json({
      msg: `Could not create subject due to ${error}`
    })
  }
})
subjectRouter.post('/update', async (req, res) => {
  try {
    const { id, name, curriculumId } = req.body
    const data = await UpdateSubject({ id, name, curriculumId })
  } catch (err) {

  }
})

export default subjectRouter
