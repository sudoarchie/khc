import { PrismaClient } from "@prisma/client";
interface Sub {
  name: string;
  curriculumId: string;
}

const prisma = new PrismaClient();
async function GetSubject({ curriculumId }: { curriculumId: string }) {
  try {
    const data = await prisma.subject.findMany({
      where: {
        curriculumId,
      },
    });
    return data;
  } catch (err) {
    if (err) throw err;
    else throw new Error(`Something went wrong!!`);
  }
}
async function CreateSubject({ name, curriculumId }: Sub) {
  try {
    const create = await prisma.subject.create({
      data: {
        name: name,
        curriculumId: curriculumId,
      },
    });
    return create;
  } catch (err) {
    if (err) throw err;
    else throw new Error("Error while creating data!!");
  }
}
async function UpdateSubject({
  id,
  name,
  curriculumId,
}: {
  id: string;
  name: string;
  curriculumId: string;
}) {
  try {
    const update = await prisma.subject.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        curriculumId: curriculumId,
      },
    });
    return update;
  } catch (error) {
    if (error) throw error;
    else throw new Error(`Unable to update!!`);
  }
}

async function DeleteSubject({ id }: { id: string }) {
  try {
    const deletedSubject = await prisma.subject.delete({
      where: {
        id: id,
      },
    });
    return deletedSubject;
  } catch (error) {
    throw new Error(`Unable to delete subject with id ${id}: ${error}`);
  }
}

export { GetSubject, CreateSubject, UpdateSubject, DeleteSubject };
