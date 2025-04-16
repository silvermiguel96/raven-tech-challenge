import { Operation } from '../entities/Operation';
import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { config } from './index';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  logging: false,
  entities: [User, Operation],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
