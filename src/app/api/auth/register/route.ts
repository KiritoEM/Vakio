import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data: {
        email: "",
        password: "",
        pseudo: "",
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
