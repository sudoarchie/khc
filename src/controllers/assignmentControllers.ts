import express from 'express'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { AuthStudent } from '../middlewares/studentauthmiddleware'
import { AddAssignment, AssignStudent, GetAssignment, SpecialAssignment } from '../services/assignmentService'
import ExtractId from '../utils/extractIdfromToken'
import { AuthTeacher } from '../middlewares/teacherauthmiddleware'

const AssignmentRouter = express.Router()

AssignmentRouter.get("/", AuthStudent, async (req, res) => {
  try {
    const { take } = req.body
    const data = req.cookies.studenttoken
    const token = data.token
    const StudentId = ExtractId({ token })
    const fetchedData = await GetAssignment({ StudentId, take })
    res.status(200).json({
      data: fetchedData
    })

  } catch (err) {
    res.status(403).json({
      msg: `Something went wrong!!`
    })
  }
})
AssignmentRouter.post("/add", AuthAdmin, async (req, res) => {
  try {
    const { name, description, url, subjectId } = req.body
    const visible = true
    const data = await AddAssignment({ name, description, url, subjectId, visible })
    res.status(200).json({
      msg: `Assignment created successfully`
    })
  } catch (err) {
    res.status(403).json({
      msg: `Error while creating new assignment`
    })
  }
})
AssignmentRouter.get('/special', AuthTeacher, async (req, res) => {
  try {
    const { subjectId } = req.body
    const data = await SpecialAssignment({ subjectId })
    res.status(200).json({
      data
    })
  } catch (err) {
    res.status(403).json({
      msg: `Cannot fetch ${err}`
    })
  }
})


AssignmentRouter.post("/addbyteacher", AuthTeacher, async (req, res) => {
  try {
    const { name, description, url, subjectId, studentId } = req.body
    const visible = false
    const data = await AddAssignment({ name, description, url, subjectId, visible })
    const assignmentId = data.id
    const newData = await AssignStudent({ studentId, assignmentId })
    res.status(200).json({
      msg: `Assignment assigned to Student`
    })
  } catch (err) {
    res.status(403).json({
      msg: `Error while creating new assignment`
    })
  }

})

AssignmentRouter.post("/assign", AuthTeacher, async (req, res) => {
  try {
    const { assignmentId, studentId } = req.body
    const data = await AssignStudent({ studentId, assignmentId })
    res.status(200).json({
      msg: `Assigned to Student`
    })
  } catch (err) {
    res.status(403).json({
      msg: `Error while Assigning to student`
    })
  }
})

export default AssignmentRouter
