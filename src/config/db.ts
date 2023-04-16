import mongoose from "mongoose";

const uri = process.env.URI_DB || "";
const db = mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from DB");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from DB");
    process.exit(1);
  });
});

export default db;
