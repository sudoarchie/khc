import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface enrollment {
  studentId: string,
  teacherId: string,
  subjectId: string,
  transactionId: string,
  videoAllow: boolean,
  timing: string,
  durationInHr: number,
  expireDate: string
}
async function Enroll({ studentId, teacherId, subjectId, transactionId, videoAllow, timing, durationInHr, expireDate }: enrollment) {
  try {

    const data = await prisma.enrollment.create(
      {
        data: {
          studentId, teacherId, subjectId, transactionId, videoAllow, timing, durationInHr, expireDate
        }
      }
    )
    return {
      data
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function GetCourse({ studentId }: { studentId: string }) {
  try {
    const course = await prisma.enrollment.findMany({
      where: {
        studentId
      }
    })
    return {
      course
    }
  } catch (err) {
    throw err
  }
}

async function StudentList({ teacherId }: { teacherId: string }) {
  try {
    const list = await prisma.enrollment.findMany({
      where: {
        teacherId
      }
    })
    return list
  } catch (err) {
    throw err
  }
}

export { Enroll, GetCourse, StudentList }
