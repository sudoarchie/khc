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
}


async function GetAssignment({ StudentId, take }: GetAssignment) {
  try {

    const data = await prisma.studentAssignment.findMany({
      where: {
        studentId: StudentId
      },
      take: take
    })
    return data
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error(`Unable to fetch data!!`)
  }
}

async function AddAssignment({ name, description, url, subjectId }: CreateSub) {
  try {
    const data = await prisma.assignment.create({
      data: {
        name,
        description,
        url,
        subjectId
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

export { GetAssignment, AddAssignment }
