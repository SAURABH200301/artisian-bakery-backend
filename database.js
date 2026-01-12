import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const config = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "artisian_bakery",
  password: process.env.DB_PASSWORD || "Test12345",
  port: Number(process.env.DB_PORT) || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  // Remove retryAttempts/retryDelay - handled by connectToDatabase
};


const pool = new Pool(config);

// Test pool directly - NO retries needed
export const testPoolConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ POOL Connected! Query test:");
    const res = await client.query("SELECT NOW()");
    console.log("⏰ Server time:", res.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error("❌ POOL failed:", error.message);
    return false;
  }
};

// Your existing retry wrapper
export async function connectToDatabase(retries = 5) {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected!");
    return client;
  } catch (error) {
    console.error(`❌ DB Error (attempt ${6-retries}):`, error.message);
    if (retries > 0) {
      console.log(`⏳ Retrying in 3s... (${retries} left)`);
      await new Promise(r => setTimeout(r, 3000));
      return connectToDatabase(retries - 1);
    }
    throw error;
  }
}

export { pool };
