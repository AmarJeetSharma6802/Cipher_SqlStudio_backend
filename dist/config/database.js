"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgres = exports.pgPool = exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// MongoDB Connection (Persistence)
const connectMongoDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ciphersqlstudio';
        await mongoose_1.default.connect(mongoUri);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectMongoDB = connectMongoDB;
// PostgreSQL Connection Pool (Sandbox)
exports.pgPool = new pg_1.Pool({
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
const connectPostgres = async () => {
    try {
        const client = await exports.pgPool.connect();
        console.log('PostgreSQL Sandbox connected successfully');
        client.release();
    }
    catch (error) {
        console.error('PostgreSQL Sandbox connection error:', error);
    }
};
exports.connectPostgres = connectPostgres;
