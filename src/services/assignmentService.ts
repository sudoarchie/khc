import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface GetAssignment {
  StudentId: string;
  take: number;
}
interface CreateSub {
  name: string;
  description: string;
  url: string;
  subjectId: string;
  visible: boolean;
}

async function GetAssignment({ StudentId, take }: GetAssignment) {
  try {
    const data = await prisma.studentAssignment.findMany({
      where: {
        studentId: StudentId,
      },
      take: take,
      include: {
        assignment: true,
      },
    });

    return data;
  } catch (err) {
    console.log(err)
    if (err) throw err;
    else throw new Error(`Unable to fetch data!!`);
  }
}

async function AddAssignment({
  name,
  description,
  url,
  subjectId,
  visible,
}: CreateSub) {
  try {
    const data = await prisma.assignment.create({
      data: {
        name,
        description,
        url,
        subjectId: subjectId,
        visible,
      },
    });
    return data;
  } catch (err) {
    if (err) throw err;
    else throw new Error(`Unable to create new assignment!!`);
  }
}

async function AssignStudent({
  studentId,
  assignmentId,
  teacherId,
  deadline
}: {
  studentId: string;
  assignmentId: string;
  teacherId: string;
  deadline: string
}) {
  try {
    const data = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
        teacherId,
        deadline,
      },
    });
    return data;
  } catch (err) {
    if (err) throw err;
    else throw new Error("Cannot Assign to Student!!");
  }
}

async function SpecialAssignment({ subjectId }: { subjectId: string }) {
  try {
    const data = await prisma.assignment.findMany({
      where: {
        subjectId,
        visible: true,
      },
    });
    return data;
  } catch (err) {
    if (err) throw err;
    else throw new Error("Error while fetching the data");
  }
}

export { GetAssignment, AddAssignment, AssignStudent, SpecialAssignment };
