import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "../helpers/userHelpers";
import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { createToken } from "../helpers/tokenHelper";
import { uploadFile } from "@/lib/uploadFile";

class AuthController {
  async uploadPDP(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const id = (await params).id;
    const formData = await req.formData();
    const file = formData.get("pdp") as File;

    try {
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

      const filePath = await uploadFile(file, "public/uploads", "image");

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { profilePicture: filePath },
      });

      return NextResponse.json(
        { message: "Profile picture uploaded successfully", updatedUser },
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
      const { email, password, name, pseudo } = await req.json();

      if (!email || !password || !pseudo || !name) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const userExists = await checkUser(email);
      if (userExists) {
        return NextResponse.json(
          { message: "User already registered" },
          { status: 400 }
        );
      }

      const user = await prisma.user.create({
        data: {
          email: email,
          password: await hashPassword(password),
          pseudo: pseudo,
          name: name,
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
      const { email, password } = await req.json();

      if (!email || !password) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Password didn't match" },
          { status: 400 }
        );
      }

      const token = createToken(user.id);

      return NextResponse.json(
        { message: "User authenticated successfully", token },
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
