const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/submit-suggestion", (req, res) => {
  const { student_number, suggestion } = req.body;

  console.log("Using database file:", require("path").resolve("./database.db"));

  if (!student_number || !suggestion) {
    return res
      .status(400)
      .json({ error: "Student number and suggestion are required" });
  }

  db.run(
    `INSERT INTO suggestions (student_number, suggestion) VALUES (?, ?)`,
    [student_number, suggestion],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Suggestion submitted successfully",
        id: this.lastID,
      });
      console.log("submitted successfully");
    }
  );
});

app.get("/get-suggestions", (req, res) => {
  db.all("SELECT * FROM suggestions ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/vote-suggestion", (req, res) => {
  const { id, type } = req.body;

  if (!id || !["upvote", "downvote"].includes(type)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const voteChange = type === "upvote" ? 1 : -1;

  db.run(
    `UPDATE suggestions SET votes = votes + ? WHERE id = ?`,
    [voteChange, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Vote recorded successfully" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
