// db.ts
import { Pool, QueryResult } from 'pg';

interface DatabaseConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
  ssl: {
    rejectUnauthorized: boolean;
  };
} 
 
class Database {
  private pool: Pool;
  private static instance: Database;

  private constructor(config: DatabaseConfig) {
    this.pool = new Pool(config);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      const dbConfig: DatabaseConfig = {
        user: 'blazing_edge_reviewer_user',
        host: 'dpg-ctl20k3qf0us7385dvf0-a.singapore-postgres.render.com',
        database: 'blazing_edge_reviewer',
        password: 'CDUgbwNlKJBylcsra1G1YbRH2TE3F5Hj',
        port: 5432,
        ssl: {
          rejectUnauthorized: false
        }
      };
      
      Database.instance = new Database(dbConfig);
    }
    return Database.instance;
  }

  public async testConnection(): Promise<void> {
    try {
      const client = await this.pool.connect();
      const result: QueryResult = await client.query('SELECT NOW()');
      console.log('🟢 Database connected successfully!');
      console.log('Server time:', result.rows[0].now);
      client.release();
    } catch (error) {
      console.error('🔴 Error connecting to the database:');
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw error;
    }
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async closePool(): Promise<void> {
    await this.pool.end();
  }
}

export default Database;