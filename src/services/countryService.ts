import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function GetAllCountry() {
  try {
    const data = await prisma.country.findMany();
    return data;
  } catch (error) {
    throw error;
  }
}

async function CreateCountry(name: string) {
  try {
    const data = await prisma.country.create({
      data: {
        name,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function TagCountry({
  countryId,
  curriculumId,
}: {
  countryId: string;
  curriculumId: string;
}) {
  try {
    const data = await prisma.countryCurriculum.create({
      data: {
        countryId,
        curriculumId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export { GetAllCountry, CreateCountry, TagCountry };
