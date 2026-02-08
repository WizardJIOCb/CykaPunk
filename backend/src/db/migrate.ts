import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';
import { config } from 'dotenv';

config();

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://cykapunk_user:cykapunk_password@localhost:5432/cykapunk',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const db = drizzle(client, { schema });

    // Run the migration
    await import('../drizzle/migrations/0000_initial');
    console.log('Migration completed successfully');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

runMigration();
