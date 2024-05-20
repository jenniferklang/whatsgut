"use strict";
var express = require("express");
var path = require("path");
var cors = require("cors");
var dotenv = require("dotenv");
var { Client } = require("pg");
require("dotenv").config();
dotenv.config();

var app = express();

var port = process.env.PORT || 3000;

var client = new Client({
  connectionString: process.env.DATABASE_URL,
  password: process.env.DB_PASSWORD,
});
client.connect();

app.use(cors());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());

app.get("/api", function (req, res) {
  client.query(
    `
      SELECT entries.entry_id, users.username, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id;
    `,
    function (error, result) {
      if (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.get("/api/dates-with-entries", function (req, res) {
  client.query(
    `
      SELECT DISTINCT entries.entry_date
      FROM entries;
    `,
    function (error, result) {
      if (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        var datesWithEntries = result.rows.map((entry) => entry.entry_date);
        res.json(datesWithEntries);
      }
    }
  );
});

app.get("/api/logs", function (req, res) {
  var { date } = req.query;
  client.query(
    `
      SELECT users.user_id, users.username, entries.entry_id, entries.entry_date, entries.content, entries.symptoms, entries.meal
      FROM entries
      JOIN users ON entries.user_id = users.user_id
      WHERE entries.entry_date::date = $1;
    `,
    [date],
    function (error, result) {
      if (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.post("/api/add-entry", function (req, res) {
  var { date, content, symptoms, meal } = req.body;
  var userId = 1;
  console.log("Received data:", { date, content, symptoms, meal });
  client.query(
    `
      INSERT INTO entries (user_id, entry_date, content, symptoms, meal)
      VALUES ($1, $2, $3, $4, $5);
    `,
    [userId, date, content, symptoms, meal],
    function (error) {
      if (error) {
        console.error("Error executing SQL query", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Loggposten har lagts till" });
      }
    }
  );
});

app.listen(port, function () {
  console.log(`Redo på http://localhost:${port}/`);
  console.log(`Connected to PostgreSQL database`);
});
