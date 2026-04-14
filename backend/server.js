const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// GET all notes
app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});


// CREATE note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          id: this.lastID,
          title,
          content,
        });
      }
    }
  );
});


// UPDATE note
app.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Updated successfully" });
      }
    }
  );
});


// DELETE note
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});