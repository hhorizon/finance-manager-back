import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import transactionRouter from "./routes/transactions";
import { limiter } from "./middlewares";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(limiter(15 * 60 * 1000, 100));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static("public"));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/transactions", transactionRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(((err, req, res, next) => {
  res.status(500).json({ message: err.message });
}) as ErrorRequestHandler);

export default app;
