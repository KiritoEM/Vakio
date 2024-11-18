import authController from "@/lib/controllers/authController";
import { handleRequest } from "@/lib/helpers/handleRequest";

export const POST = handleRequest(authController.register);
