import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import rateLimiter from "./Middlewares/rateLimiter.js";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server started on port", PORT);
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
