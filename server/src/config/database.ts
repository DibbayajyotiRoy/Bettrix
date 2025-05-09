// Neon DB connection
import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';
import { env } from './env';

// Serverless connection
export const sql = neon(env.DATABASE_URL);

// Connection pool (for transactions)
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: true
});

// Test connection
export async function testConnection() {
  try {
    await sql`SELECT 1`;
    console.log('✅ Neon DB connected');
  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
}