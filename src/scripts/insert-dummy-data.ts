import Database from '../config/db';

async function insertDummyData() {
  const db = Database.getInstance();
  const pool = db.getPool();

  const dummyUsers = [
    { username: 'JohnDoe', email: 'johndoe@example.com' },
    { username: 'JaneSmith', email: 'janesmith@example.com' },
    { username: 'AliceWonder', email: 'alice@example.com' },
    { username: 'BobBuilder', email: 'bob@example.com' },
  ];

  try {
    for (const user of dummyUsers) {
      const query = `
        INSERT INTO users (username, email)
        VALUES ($1, $2)
      `;
      const values = [user.username, user.email];
      await pool.query(query, values);
    }

    console.log('🟢 Dummy data inserted into users table successfully!');
  } catch (error) {
    console.error('🔴 Error inserting dummy data:', error);
  } finally {
    await db.closePool();
  }
}

insertDummyData().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
