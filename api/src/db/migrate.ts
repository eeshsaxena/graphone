import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { config } from '../config';

// Applies db/migration.sql to the configured Postgres/Supabase database.
async function migrate() {
  if (!config.databaseUrl) {
    console.error('DATABASE_URL is not set. Set it in api/.env before migrating.');
    process.exit(1);
  }
  const sql = fs.readFileSync(path.join(__dirname, '../../db/migration.sql'), 'utf8');
  const pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseUrl.includes('supabase') ? { rejectUnauthorized: false } : undefined,
  });
  console.log('Applying migration...');
  await pool.query(sql);
  console.log('Migration applied.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
