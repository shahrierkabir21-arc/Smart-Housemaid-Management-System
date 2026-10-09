import { Pool } from 'pg';

// Reuse the connection pool during Next.js development reloads.
const globalForPg = globalThis as typeof globalThis & { __smartMaidPool?: Pool };
const pool = globalForPg.__smartMaidPool ?? new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'smart_housemaid',
  password: process.env.PG_PASSWORD || '',
  port: Number(process.env.PG_PORT || 5432),
  max: 10,
});
if (process.env.NODE_ENV !== 'production') globalForPg.__smartMaidPool = pool;
export default pool;
