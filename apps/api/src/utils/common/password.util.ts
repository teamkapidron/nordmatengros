import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateRandomPassword(length: number) {
  return nanoid(length);
}
