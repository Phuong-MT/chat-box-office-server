import { v4 } from 'uuid';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

export const generateUUID = () => {
  return v4();
};
