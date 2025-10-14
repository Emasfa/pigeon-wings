require("dotenv").config({ path: "../.env" });
console.log(`Config backend: ${process.env.POSTGRES_PORT}`);

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM messages;");
    res.json(results.rows);
  } catch (err) {
    console.error("Erreur lors de la requête SQL:", err);
    res.status(500).send("Erreur serveur (500)");
  }
});

app.get("/users", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users;");
    res.json(results.rows);
  } catch {
    console.error("Erreur lors de la requête SQL:", err);
    res.status(500).send("Erreur serveur (500)");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend piegon-wings running on http://localhost:${PORT}`);
});
