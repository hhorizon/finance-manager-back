const { mkdir } = require("fs/promises");
const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 8000;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(console.error);
