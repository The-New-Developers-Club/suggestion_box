const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure the database is always inside the backend folder
const dbPath = path.resolve(__dirname, "database.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_number TEXT NOT NULL,
      suggestion TEXT NOT NULL,
      votes INTEGER DEFAULT 0
    )`
  );
});

module.exports = db;
