import { NextRequest, NextResponse } from "next/server";

export const handleRequest = (
  handler: (req: NextRequest, res: NextResponse) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    const res = NextResponse.next();
    return await handler(req, res);
  };
};
