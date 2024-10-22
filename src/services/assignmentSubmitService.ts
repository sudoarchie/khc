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

async function MarksForAssignment({ assignmentSubmitId, marks }: { assignmentSubmitId: string, marks: number }) {
  try {
    const data = await prisma.assignmentSubmitGrade.create({
      data: {
        assignmentSubmitId: assignmentSubmitId,
        marks
      }
    })
    return data
  } catch (err) {
    console.log(err)
    throw err
  }

}

async function GetMarks({ studentId }: { studentId: string }) {
  try {
    const data = await prisma.assignmentSubmitGrade.findMany({
      where: {
        assignmentSubmit: {
          studentassignment: {
            studentId: studentId
          }
        }
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export { SubmitAssignment, GetSubmittedAssignment, MarksForAssignment, GetMarks };
