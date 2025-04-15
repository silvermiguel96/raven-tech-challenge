import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './index';  // Importas tus variables .env centralizadas
// import { User } from '../entities/User';  // Cambia esto según tus entidades

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: true, // Cambia a false en producción ⚠️
  logging: false,
  entities: [], // Aquí pones tus entidades
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
