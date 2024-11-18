import bcrypt from "bcrypt";

let SALT = 20;

const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = (password: string, hashedPassword: string) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error(err);
  }
};

export { hashPassword, comparePassword };
