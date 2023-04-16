import { mkdir } from "fs/promises";
import app from "./app";
import db from "./config/db";

const PORT = process.env.PORT || 8000;
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "tmp";

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(UPLOAD_FOLDER, { recursive: true });
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(console.error);
