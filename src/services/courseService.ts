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
    const data = await prisma.course.findMany()
    return data
  } catch (error) {
    throw error
  }
}

async function GetCourseById({ id }: { id: string }) {
  try {
    const data = await prisma.course.findUnique({
      where: {
        id
      }
    })
    return data
  } catch (err) {
    throw err

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
interface Update {
  id: string,
  name: string,
  description: string,
  subjectId: string,
  thumbnail: string,
  price: number
}
async function UpdateCourse({ id, name, description, subjectId, thumbnail, price }: Update) {
  try {
    const data = prisma.course.update({
      where: {
        id
      },
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
interface VideoSchema {
  courseId: string,
  name: string,
  description: string,
  url: string
}

async function UploadVideo({ courseId, name, description, url }: VideoSchema) {
  try {
    const data = prisma.courseVideo.create({
      data: {
        courseId,
        name,
        description,
        url
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

async function GetVideos({ courseId }: { courseId: string }) {
  try {
    const data = await prisma.courseVideo.findMany({
      where: {
        courseId
      }
    })
    return data
  } catch (err) {
    throw err
  }
}

async function DeleteVideos({ id }: { id: string }) {
  try {
    const data = await prisma.courseVideo.delete({
      where: {
        id
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export { CreateCourse, GetCourseById, GetAllCourse, DeleteCourse, UpdateCourse, UploadVideo, GetVideos, DeleteVideos }
