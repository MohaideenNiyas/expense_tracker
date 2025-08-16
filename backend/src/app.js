import express from "express";
import cors from "cors";
import morgan from "morgan";
import transactionsRouter from "./routes/transactions.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, service: "Expense Tracker API" }));
app.use("/api/transactions", transactionsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
