import listEndpoints from "express-list-endpoints";
import calculateRoutes from "./calculate.routes";
import historyRoutes from "./history.routes";
import authRoutes from './auth.routes';
import { Router } from "express";
import { config } from '../config';

const router = Router();
const apiV1 = Router();

apiV1.use("/", authRoutes);
apiV1.use("/", calculateRoutes); 
apiV1.use("/", historyRoutes);

router.use("/api/v1", apiV1);

const routes = listEndpoints(router).flatMap((route) =>
    route.methods.map((method) => ({
        Method: method,
        Path: `${config.app.baseUrl}/api/v1${route.path}`,
    }))
);

console.log("🗂️ Rutas Registradas:");
console.table(routes);

export default router;