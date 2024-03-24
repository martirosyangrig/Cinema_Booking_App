import bcrypt from "bcrypt";

const SALT = 12;

export const getHash = (pwd: string): string => {
  return bcrypt.hashSync(pwd, SALT);
};

export const compare = (pwd: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(pwd, hash);
};
