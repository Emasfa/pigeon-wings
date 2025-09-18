require("dotenv").config({ path: "../.env" });
console.log("Config backend: process.env.POSTGRES_PORT");

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// db connexion
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.use(express.json());

// 1st API route: get all messages
app.get("/messages", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM message;");
    res.json(results.rows);
  } catch (err) {
    console.error("Erreur lors de la requête SQL:", err);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend pigeon-wings running on http://localhost:${PORT}`);
});
