import jwt from "jsonwebtoken";

let SECRET_KEY = process.env.SECRET_KEY;

const createToken = (id: number) => {
  const payload = { id: `${id}` };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "365d",
  });

  return token;
};

export { createToken };
