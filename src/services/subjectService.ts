import { PrismaClient } from "@prisma/client"
interface Sub {
  name: string
  curriculumId: string
}

const prisma = new PrismaClient()
async function GetSubject() {
  try {
    const data = await prisma.subject.findMany()
    return data
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error(`Something went wrong!!`)
  }
}
async function CreateSubject({ name, curriculumId }: Sub) {
  try {
    const create = await prisma.subject.create({
      data: {
        name: name,
        curriculumId: curriculumId
      }
    })
    return create
  } catch (err) {
    if (err)
      throw err
    else
      throw new Error('Error while creating data!!')
  }
}
async function UpdateSubject({ id }: { id: string }) {
  try {
    const data = await prisma.subject.findUnique({
      where: {
        id: id
      }
    })
  } catch (error) {

  }
}

export { GetSubject, CreateSubject, UpdateSubject }
