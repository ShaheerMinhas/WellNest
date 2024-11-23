import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,       // DB Host
    user: process.env.DB_USER,       // DB User
    password: process.env.DB_PASSWORD, // DB Password
    database: process.env.DB_NAME,   // DB Name
    port: Number(process.env.DB_PORT),         // Replace with your DB port
});

export default pool;


