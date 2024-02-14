import fs from "fs/promises";

export const deleteFile = async (filePath) => {
  // Asynchronously delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
};
