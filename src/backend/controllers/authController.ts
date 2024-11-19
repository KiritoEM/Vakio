import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "../helpers/userHelpers";
import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { createToken } from "../helpers/tokenHelper";

class AuthController {
  async uploadPDP(req: NextRequest) {
    try {
      const formData = await req.formData();
      const file = formData.get("pdp");
      console.log(file);

      return NextResponse.json(
        { message: "File uploaded successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  async register(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.email || !data.password || !data.pseudo || !data.name) {
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

      const token = createToken(user.id);

      return NextResponse.json(
        { message: "Account created successfully", token },
        { status: 201 }
      );
    } catch (err) {
      console.error(err);
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

      const token = createToken(user.id);

      return NextResponse.json(
        { message: "User authentificated successfully", token },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export default new AuthController();
