import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "../helpers/AuthHelpers";
import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../../lib/bcrypt";

class AuthController {
  async register(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.email || !data.password || !data.pseudo) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const userExists = await checkUser(data.email);
      if (userExists) {
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

      return NextResponse.json(
        { message: "Account created successfully", user },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  async login(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.email || !data.password) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      const isPasswordValid = comparePassword(data.password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Password didn't match" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "User authentificated successfully", user },
        { status: 201 }
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
