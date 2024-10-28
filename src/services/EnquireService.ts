import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function CreateEnquire({ email, mobileNo, message }: { email: string, mobileNo: string, message: string }) {
  try {
    const data = await prisma.enquire.create({
      data: {
        email,
        mobileNo,
        message
      }
    })
    return data
  } catch (err) {
    throw err
  }
}

export { CreateEnquire }
