import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("securepassword123", 10);

  // Seed Admin
  const admin = await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  console.log(`Admin seeded: ${admin.email}`);

  // Seed Curriculum
  const curriculum = await prisma.curriculum.create({
    data: {
      name: "Standard Curriculum",
      description: "Curriculum for standard grades",
      logoUrl:
        "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
    },
  });

  console.log(`Curriculum seeded: ${curriculum.name}`);

  // Seed Grade
  const grade = await prisma.grade.create({
    data: {
      name: "Grade 10",
      curriculumId: curriculum.id,
    },
  });

  console.log(`Grade seeded: ${grade.name}`);

  // Seed Subject
  const subject = await prisma.subject.create({
    data: {
      name: "Mathematics",
      gradeId: grade.id,
    },
  });

  console.log(`Subject seeded: ${subject.name}`);

  // Seed Teacher
  const teacher = await prisma.teacher.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      mobileNo: "1234567890",
      password: hashedPassword,
    },
  });

  console.log(`Teacher seeded: ${teacher.name}`);

  // Seed Student
  const student = await prisma.student.create({
    data: {
      email: "student@example.com",
      mobileNo: "9876543210",
      name: "Jane Doe",
      password: hashedPassword,
      country: "US",
      gradeId: grade.id,
    },
  });

  console.log(`Student seeded: ${student.name}`);

  // Seed Assignment
  const assignment = await prisma.assignment.create({
    data: {
      name: "Algebra Homework",
      description: "Solve the algebra problems in the provided document.",
      url: "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
      subjectId: subject.id,
      visible: true,
    },
  });

  console.log(`Assignment seeded: ${assignment.name}`);

  // Seed Blog
  const blog = await prisma.blog.create({
    data: {
      title: "Introduction to Algebra",
      description: "A detailed guide to understanding algebra.",
      url: "https://khcwebsite.s3.ap-south-1.amazonaws.com/1732293761249-359027dc1e90da28822743c23a5208a0.avif",
    },
  });

  console.log(`Blog seeded: ${blog.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
