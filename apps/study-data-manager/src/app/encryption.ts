import * as bcrypt from "bcryptjs";

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
export async function comparePasswords(password: string, dbHash: string) {
  return bcrypt.compare(password, dbHash);
}
