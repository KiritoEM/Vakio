import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

const uploadFile = async (
  file: File,
  uploadDir: string,
  uploadType: "image" | "video"
): Promise<string> => {
  if (
    (uploadType === "image" && !file.type.startsWith("image")) ||
    (uploadType === "video" && !file.type.startsWith("video"))
  ) {
    throw new Error("Please verify the files you have uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const filePath = `${uploadDir}/${file.name}`;
  await fs.writeFile(filePath, buffer);

  revalidatePath("/");

  return filePath;
};

export { uploadFile };
