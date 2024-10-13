import express from 'express'
import { AuthAdmin } from '../middlewares/adminauthmiddleware'
import { AuthStudent } from '../middlewares/studentauthmiddleware'
import { AddAssignment, AssignStudent, GetAssignment } from '../services/assignmentService'
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
    const data = await AddAssignment({ name, description, url, subjectId })
    res.status(200).json({
      msg: `Assignment created successfully`
    })
  } catch (err) {
    res.status(403).json({
      msg: `Error while creating new assignment`
    })
  }
})

AssignmentRouter.post("/addbyteacher", AuthTeacher, async (req, res) => {
  try {
    const { name, description, url, subjectId, studentId } = req.body
    const data = await AddAssignment({ name, description, url, subjectId })
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

export default AssignmentRouter
