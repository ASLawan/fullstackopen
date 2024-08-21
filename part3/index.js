const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
// const HOST = "localhost";

const app = express();
app.use(express.json());
app.use(cors());

//mock data
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// GET all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// GET Single resource
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

// DELETE single resource
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

// POST create resource

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Content cannot be empty",
    });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(newNote);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
