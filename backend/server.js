const express = require("express");
const pg = require("pg");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const client = new pg.Client({
  connectionString: process.env.PGURI_NEW,
});

client.connect();

app.get("/", async (request, response) => {
  try {
    const result = await client.query("SELECT NOW() as now");
    response.send(`Hello World! Databasens tid: ${result.rows[0].now}`);
  } catch (error) {
    console.error("Error executing SQL query", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/api", async (_req, res) => {
  try {
    const entries = await getEntries();
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getEntries() {
  const query = `
      SELECT entries.entry_id, users.username, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id;
  `;
  const result = await client.query(query);
  return result.rows;
}

app.listen(PORT, () => {
  console.log(`Servern är redo på http://localhost:${PORT}/`);
});
