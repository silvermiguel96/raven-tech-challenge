import { Operation } from "./src/entities/operation.entity";
import { User } from "./src/entities/user.entity";
import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Operation]
};

export = config;
