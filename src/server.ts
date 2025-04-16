import { AppDataSource } from './config/data-source';
import { json } from "body-parser";
import { config } from './config';
import routes from './routers';
import express from "express";

const app = express();

app.use(json());

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");
    app.listen(config.app.port, () => {
      console.log(`🚀 Server running on ${config.app.baseUrl}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });

