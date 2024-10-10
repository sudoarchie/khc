import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
interface createCurriculum {
  name: string
  description: string
  logoUrl: string
}
async function Create({ name, description, logoUrl }: createCurriculum) {
  try {
    const upload = await prisma.curriculum.create({
      data: {
        name,
        description,
        logoUrl
      }
    })
    return ({
      msg: "Curriculum created Successfully",
      curriculum: upload
    })
  }
  catch (err) {
    if (err)
      throw err
    else
      throw new Error('Something went wrong!')
  }
}

async function Get() {
  try {
    const data = await prisma.curriculum.findMany()
    return {
      data
    }
  } catch (err) {
    throw new Error('Cannot fetch the data due some technical issue please contact the Admin ')
  }
}

export { Create, Get }
