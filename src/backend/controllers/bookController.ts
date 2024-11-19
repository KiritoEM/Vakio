import { BearerNextRequest, NextResponse } from "next/server";

class BookController {
  async postBook(req: BearerNextRequest) {
    return NextResponse.json({ status: 200 });
  }
}

export default new BookController();
