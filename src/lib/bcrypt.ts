import bcrypt from "bcrypt";

let SALT = 20;

const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT);
};

export { hashPassword };
