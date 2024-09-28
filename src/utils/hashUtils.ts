import bcrypt from 'bcrypt';

export default async function HashPassword({ password }: { password: string }) {
  const saltRounds = 10; // Number of salt rounds
  const hash = await bcrypt.hash(password, saltRounds); // Hashing the password directly with salt rounds
  return hash;
}
