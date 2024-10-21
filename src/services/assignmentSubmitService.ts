import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface Submit {
  studentAssignmentId: string,
  SubmitUrl: string
}
async function SubmitAssignment({ studentAssignmentId, SubmitUrl }: Submit) {
  try {
    const data = await prisma.assignmentSubmit.create({
      data: {
        studentAssignmentId,
        SubmitUrl
      }
    })
    return data
  } catch (err) {
    throw err
  }

}

export { SubmitAssignment }
