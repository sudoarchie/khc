import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface Create {
  title: string,
  description: string,
  url: string
}
async function CreateBlog({ title, description, url }: Create) {
  try {
    const data = await prisma.blog.create({
      data: {
        title,
        description,
        url
      }
    })
    return {
      data
    }
  } catch (err) {
    throw err
  }

}

export { CreateBlog }
