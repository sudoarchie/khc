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

async function DeleteCourse({ id }: { id: string }) {
  try {
    const data = await prisma.course.delete({
      where: {
        id: id
      }
    })
    return data
  } catch (err) {
    throw err
  }
}

export { CreateCourse, GetAllCourse, DeleteCourse }
