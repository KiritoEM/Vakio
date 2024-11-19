import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

const uploadFile = async (
  file: File,
  uploadDir: string,
  uploadType: "image" | "video"
) => {
  if (
    (uploadType !== "image" && file.type.startsWith("image")) ||
    (uploadType !== "video" && file.type.startsWith("video"))
  ) {
    alert("Veuillez vérifiez les fichiers que vous avez téléchargés");
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await fs.writeFile(`${uploadDir}${file.name}`, buffer);

  revalidatePath("/");
};

export { uploadFile };
