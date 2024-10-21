import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Submit {
  studentAssignmentId: string;
  SubmitUrl: string;
}
async function SubmitAssignment({ studentAssignmentId, SubmitUrl }: Submit) {
  try {
    const data = await prisma.assignmentSubmit.create({
      data: {
        studentAssignmentId,
        SubmitUrl,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
}

async function GetSubmittedAssignment({ teacherId }: { teacherId: string }) {
  try {
    const data = await prisma.assignmentSubmit.findMany({
      where: {
        studentassignment: {
          teacherId: teacherId,
        },
      },
    });
    return {
      data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { SubmitAssignment, GetSubmittedAssignment };
