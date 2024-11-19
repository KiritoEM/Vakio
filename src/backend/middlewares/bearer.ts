import { BearerNextRequest, NextResponse } from "next/server";
import { decodeToken } from "../helpers/tokenHelper";
import { JwtPayload } from "jsonwebtoken";

const bearer = (handler: Function) => {
  return async (req: BearerNextRequest) => {
    const header = req.headers.get("authorization");

    if (!header?.startsWith("Bearer")) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    try {
      const token = header.split(" ")[1].toString();
      const payload = await decodeToken(token);

      if (payload) {
        req.user = { id: (payload as JwtPayload).id };
      }
      console.log((payload as JwtPayload).id);
    } catch (err) {
      console.error("An error occurred:", err);
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    return handler(req);
  };
};

export default bearer;
