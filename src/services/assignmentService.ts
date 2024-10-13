import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();
interface GetAssignment {
  StudentId: string,
  take: number
}
interface CreateSub {
  name: string,
  description: string,
  url: string,
  subjectId: string
  visible: boolean
}


async function GetAssignment({ StudentId, take }: GetAssignment) {
  try {

    const data = await prisma.studentAssignment.findMany({
      where: {
        studentId: StudentId
      },
      take: take,
      include: {
        assignment: true
      }
    })

    return data
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error(`Unable to fetch data!!`)
  }
}

async function AddAssignment({ name, description, url, subjectId, visible }: CreateSub) {
  try {
    const data = await prisma.assignment.create({
      data: {
        name,
        description,
        url,
        subjectId,
        visible
      }
    })
    return data
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error(`Unable to create new assignment!!`)
  }
}

async function AssignStudent({ studentId, assignmentId }: { studentId: string, assignmentId: string }) {
  try {
    const data = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId
      }
    })
    return data
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error('Cannot Assign to Student!!');
  }

}

export { GetAssignment, AddAssignment, AssignStudent }
