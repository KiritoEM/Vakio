import bookController from "@/backend/controllers/bookController";
import bearer from "@/backend/middlewares/bearer";

export const POST = bearer(bookController.postBook);
export const GET = bearer(bookController.getAllBook);
