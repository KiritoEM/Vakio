import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
  }
};

export default handler;
