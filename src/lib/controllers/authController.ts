import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "../helpers/AuthHelpers";
import { prisma } from "../prisma";
import { hashPassword } from "../bcrypt";

class AuthController {
  async register(req: NextRequest, res: NextResponse) {
    try {
      const data = await req.json();

      if (!data.email && !data.password && !data.pseudo) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      if (checkUser(data.email)) {
        return NextResponse.json(
          { message: "User already registered" },
          { status: 400 }
        );
      }

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: await hashPassword(data.password),
          pseudo: data.pseudo,
        },
      });

      if (user) {
        return NextResponse.json(
          { message: "account created successfully" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "account created successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export default new AuthController();
