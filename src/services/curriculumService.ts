import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface createCurriculum {
  name: string;
  description: string;
  logoUrl: string;
}
async function Create({ name, description, logoUrl }: createCurriculum) {
  try {
    const upload = await prisma.curriculum.create({
      data: {
        name,
        description,
        logoUrl,
      },
    });
    return {
      msg: "Curriculum created Successfully",
      curriculum: upload,
    };
  } catch (err) {
    if (err) throw err;
    else throw new Error("Something went wrong!");
  }
}

async function Get() {
  try {
    const data = await prisma.curriculum.findMany();
    return {
      msg: "Data fetched successfully",
      data,
    };
  } catch (err: unknown) {
    console.error("Error in Get function:", err);
    if (err instanceof Error) {
      return {
        msg: "Error fetching data",
        error: err.message,
      };
    } else {
      return {
        msg: "Error fetching data",
        error: "An unknown error occurred",
      };
    }
  }
}

async function GetList() {
  try {
    const data = await prisma.curriculum.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
async function DeleteCurriculum({ id }: { id: string }) {
  try {
    const data = await prisma.curriculum.delete({
      where: { id },
    });
    return {
      msg: "Curriculum deleted successfully",
      data,
    };
  } catch (err) {
    throw err;
  }
}
export { Create, Get, GetList, DeleteCurriculum };
