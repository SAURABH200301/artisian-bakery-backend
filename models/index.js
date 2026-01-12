import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME||"artisian_bakery",
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Test12345',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;