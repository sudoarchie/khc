import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
interface Created {
  name: string,
  description: string,
  subjectId: string,
  thumbnail: string,
  price: number
}
async function CreateCourse({ name, description, subjectId, thumbnail, price }: Created) {
  try {
    const data = prisma.course.create({
      data: {
        name,
        description,
        subjectId,
        thumbnail,
        price
      }
    })
    return data
  } catch (err) {
    throw err
  }
}

async function GetAllCourse() {
  try {
    const data = await prisma.course.findMany({})
    return data
  } catch (error) {
    throw error
  }
}

export { CreateCourse, GetAllCourse }
