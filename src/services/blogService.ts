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
async function GetBlog({ take }: { take: number }) {
  let skip = take - 15
  if (skip < 0) {
    skip = 0
  }
  try {
    const data = await prisma.blog.findMany({
      take, skip
    })
    return data
  } catch (error) {
    throw error
  }
}

async function DeleteBlog({ id }: { id: string }) {
  try {
    const del = await prisma.blog.delete({
      where: {
        id
      }
    })
    return {
      del
    }
  } catch (error) {
    throw error
  }
}

export { CreateBlog, GetBlog, DeleteBlog }
