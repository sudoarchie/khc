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
  let skip = take - 30;
  if (skip < 0) {
    skip = 0;
  }
  try {
    const data = await prisma.grade.findMany({
      select: {
        id: true,
        name: true,
        curriculum: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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
async function DeleteGrade({ id }: { id: string }) {
  try {
    const data = await prisma.grade.delete({
      where: { id },
    });
    return {
      msg: `Grade deleted successfully`,
      data,
    };
  } catch (err) {
    throw err;
  }
}

export { CreateGrade, GetAllGrades, GetGradeByCurriculum, DeleteGrade };
