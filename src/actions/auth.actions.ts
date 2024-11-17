"use server";

import { prisma } from "@/lib/prisma";

interface RegisterData {
  email: string;
  password: string;
  pseudo: string;
}

const createAccount = async <T>(data: RegisterData) : Promise<Response<T>>=> {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        pseudo: data.pseudo,
      },
    });

    if (user) {
      return user;
    }
  } catch (err) {
    console.error(err);
  }
};

export { createAccount };
