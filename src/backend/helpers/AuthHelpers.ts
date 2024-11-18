import { prisma } from "@/lib/prisma";

const checkUser = async (email: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    }
  } catch (err) {
    throw new Error(err);
  }
};


export { checkUser };
