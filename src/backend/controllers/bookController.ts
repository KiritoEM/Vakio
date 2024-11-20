import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/uploadFile";
import { BearerNextRequest, NextResponse } from "next/server";

class BookController {
  async postBook(req: BearerNextRequest) {
    try {
      const formData = await req.formData();

      const file = formData.get("image") as File;
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const genreStr = formData.get("genres") as string;
      const genres = genreStr
        ? genreStr.split(",").map((genre) => genre.trim())
        : [];

      if (!file) {
        return NextResponse.json(
          { message: "No picture uploaded" },
          { status: 400 }
        );
      }

      if (!title || !description || !genreStr) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      const filePath = await uploadFile(file, "public/uploads/books", "image");

      if (!filePath) {
        return NextResponse.json(
          { message: "File upload failed" },
          { status: 500 }
        );
      }

      const book = await prisma.book.create({
        data: {
          cover: filePath,
          description: description,
          genres: genres,
          title: title,
          userId: parseInt(req.user?.id, 10),
        },
      });

      if (!book) {
        return NextResponse.json(
          { message: "An error occurred when posting book" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Book posted successfully", book },
        { status: 200 }
      );
    } catch (err) {
      console.error("Internal server error:", err.message);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  async getAllBook(req: BearerNextRequest) {
    try {
      const allBooks = await prisma.book.findMany({
        include: {
          user: {
            select: {
              id: true,
              pseudo: true,
              name: true,
              email: true,
              profilePicture: true,
            },
          },
        },
      });

      if (!allBooks) {
        return NextResponse.json(
          { message: "An error occurred when getting all books" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Book posted successfully", allBooks },
        { status: 200 }
      );
    } catch (err) {
      console.error("Internal server error:", err.message);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export default new BookController();
