"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const statistics_1 = __importDefault(require("./routes/statistics"));
const app = (0, express_1.default)();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(limiter(15 * 60 * 1000, 100));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)(formatsLogger));
app.use(express_1.default.static("public"));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   }),
// );
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: 10000 }));
app.use("/api/auth", auth_1.default);
app.use("/api/user", users_1.default);
app.use("/api/transactions", transactions_1.default);
app.use("/api/statistics", statistics_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use(((err, req, res, next) => {
    res.status(500).json({ message: err.message });
}));
exports.default = app;
