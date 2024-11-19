import { NextRequest } from "next/server";

declare module "next/server" {
  interface BearerNextRequest extends NextRequest {
    user?: {
      id: string;
    };
  }
}
