require("dotenv").config({ path: "../.env" });
console.log(`Config backend: ${process.env.POSTGRES_PORT}`);

const express = require("express");
const { Pool } = require("pg");

const app = express();
const cors = require("cors");
const PORT = process.env.BACKEND_PORT || 3001;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.use(cors());
app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM messages;");
    res.json(results.rows);
  } catch (err) {
    console.error("SQL Query error:", err);
    res.status(500).send("Server error (500)");
  }
});

app.post("/messages", async (req, res) => {
  const { content, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO messages (content, user_id) VALUES ($1, $2) RETURNING *",
      [content, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting message:", err);
    res.status(500).send("Failed to insert message into the database");
  }
});

app.get("/users", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users;");
    res.json(results.rows);
  } catch {
    console.error("SQL Query error:", err);
    res.status(500).send("Server error (500)");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend piegon-wings running on http://localhost:${PORT}`);
});
