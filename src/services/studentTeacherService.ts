import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface assign {
  teacherId: string,
  studentId: string,
  timing: string
}
async function AssignTeacher({ teacherId, studentId, timing }: assign) {
  try {
    const data = await prisma.studentTeacher.create({
      data: {
        teacherId,
        studentId,
        timing
      }
    })
    return {
      data
    }
  } catch (err) {
    throw err
  }
}

export { AssignTeacher }
