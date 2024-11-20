import { BearerNextRequest, NextResponse } from "next/server";

class BookController {
  async postBook(req: BearerNextRequest) {
    try {
      const {} = req.json();

      return NextResponse.json({ status: 200 });
    } catch (err) {
      console.error("Internal server error:", err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export default new BookController();
