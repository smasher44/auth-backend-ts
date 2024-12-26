import Database from '../config/db';

async function createTables() {
  const db = Database.getInstance();
  const pool = db.getPool();

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('🟢 Table "users" created successfully!');
  } catch (error) {
    console.error('🔴 Error creating table:', error);
  } finally {
    await db.closePool();
  }
}

createTables();
