import { logger } from "../utils/logger";
import cors from "cors";

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

export const corsOptions = cors({
  origin: (origin: string, callback: (arg0: Error | null, arg1: boolean | undefined) => any) => {
    if (!origin) {
      logger.info("Solicitud sin origen, permitida (ej: Postman o servidor interno).");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      logger.info(`CORS permitido para: ${origin}`);
      return callback(null, true);
    } else {
      logger.warn(`CORS bloqueado para: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
});
