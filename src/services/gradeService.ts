import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function CreateGrade({
  name,
  curriculumId,
}: {
  name: string;
  curriculumId: string;
}) {
  try {
    const create = await prisma.grade.create({
      data: {
        name,
        curriculumId,
      },
    });
    return {
      msg: `Grade created successfully`,
      data: create,
    };
  } catch (err) {
    throw err;
  }
}

async function GetAllGrades({ take }: { take: number }) {
  const skip = take - 10;
  try {
    const data = await prisma.grade.findMany({
      take: take,
      skip: skip,
    });
    return data;
  } catch (err) {
    throw err;
  }
}

async function GetGradeByCurriculum({
  curriculumId,
}: {
  curriculumId: string;
}) {
  try {
    const data = await prisma.grade.findMany({
      where: {
        curriculumId,
      },
    });
    return {
      data,
    };
  } catch (error) {
    throw error;
  }
}

export { CreateGrade, GetAllGrades, GetGradeByCurriculum };
