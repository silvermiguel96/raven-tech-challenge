import { AppDataSource } from './config/data-source';
import authRoutes from './routers/authRoutes';
import { json } from "body-parser";
import { config } from './config';
import express from "express";

const app = express();

app.use(json());

app.use("/api/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");
    app.listen(config.app.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.app.port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });
