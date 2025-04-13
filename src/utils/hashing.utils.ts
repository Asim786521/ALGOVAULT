/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/utils/hashing.util.ts
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Hashes a given password.
 * 
 * @param password - The password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Compares a given password with a hashed password.
 * 
 * @param password - The plain text password
 * @param hashedPassword - The hashed password to compare with
 * @returns A boolean indicating if the passwords match
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing password: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}
