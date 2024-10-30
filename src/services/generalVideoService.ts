import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function PostGeneralVideos({ name, discription, url }: { name: string, discription: string, url: string }) {
  try {
    const data = await prisma.generalVideo.create({
      data: {
        name,
        discription,
        url
      }
    })
    return data
  } catch (err) {
    throw err
  }
}

export { PostGeneralVideos }
