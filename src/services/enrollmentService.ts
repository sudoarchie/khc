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

export { Enroll }
