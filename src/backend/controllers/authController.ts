import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "../helpers/userHelpers";
import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { createToken } from "../helpers/tokenHelper";

class AuthController {
  public uploadDir: String = "public/uploads";

  async uploadPDP(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const id = (await params).id;
      const formData = await req.formData();
      const file = formData.get("pdp") as File;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      if (!file) {
        return NextResponse.json(
          { message: "No file uploaded" },
          { status: 400 }
        );
      }

      // const updatedUser = await prisma.user.update({
      //   where: { id: parseInt(id) },
      //   data: { profilePicture: `/uploads/${file.filename}` },
      // });

      return NextResponse.json(
        { message: "Profile picture uploaded successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
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
          name: data.name,
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
