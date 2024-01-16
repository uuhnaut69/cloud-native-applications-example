import bcrypt from 'bcryptjs';

export function hash(textInput: string): Promise<string> {
  return bcrypt.hash(textInput, 10);
}

export function compare(textInput: string, hash: string): Promise<boolean> {
  return bcrypt.compare(textInput, hash);
}
