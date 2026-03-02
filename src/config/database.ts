import mongoose from 'mongoose';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ciphersqlstudio';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const pgPool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'neondb', 
  password: process.env.PG_PASSWORD || 'postgres',
  port: parseInt(process.env.PG_PORT || '5432', 10),
  ssl: process.env.PG_SSLMODE === 'require' ? { rejectUnauthorized: false } : false,
  
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}); 

export const connectPostgres = async () => {
  try {
    const client = await pgPool.connect();
    console.log('PostgreSQL Sandbox connected successfully');
    client.release();
  } catch (error) {
    console.error('PostgreSQL Sandbox connection error:', error);
  }
};
