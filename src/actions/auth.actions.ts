"use server";

import { Response } from "@/helpers/types/status";
import { hashPassword } from "@/lib/bcrypt";
import { prisma } from "@/lib/prisma";

interface RegisterData {
  email: string;
  password: string;
  pseudo: string;
}

const createAccount = async <T>(data: RegisterData): Promise<Response<T>> => {
  let hashedPassword = await hashPassword(data.password);
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        pseudo: data.pseudo,
      },
    });

    if (user) {
      console.log(user);
      return {
        status: 200,
        rest: user as T,
        message: "Register successfully",
      };
    }

    return {
      status: 400,
      message: "An error was occured when creating account",
    };
  } catch (err) {
    return {
      status: 400,
      rest: err as T,
      message: "An error was occured when creating account",
    };
  }
};

export { createAccount };
