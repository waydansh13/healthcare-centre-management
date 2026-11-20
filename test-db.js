import mysql from "mysql2/promise";

async function testDB() {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "university_health",
    });

    console.log("✅ Connected!");
    const [rows] = await conn.query("SELECT 1+1 AS result");
    console.log(rows);

    await conn.end();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

testDB();
