//-------------------- Require Files & Packages --------------------//
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const db = require("./db/db.json");
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
//allows the server to parse incoming data
app.use(express.urlencoded({ extended: true}));
//allows the server to parse incoming JSON data
app.use(express.json());
//serves static files from the public directory
app.use(express.static('public'));

const dbFilePath = path.join(__dirname, 'db', 'db.json');


//-------------------- API Routes --------------------//

//Get all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(dbFilePath, (err, data) => {
    if (err) throw err;
    let dbData = JSON.parse(data);
    res.json(dbData)
  });
});

//Create a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  db.push(newNote)

  fs.writeFileSync(dbFilePath, JSON.stringify(db))

  res.json(db)
});

//Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const deleteNote = db.filter((note) =>
    note.id !== parseInt(req.params.id))

    fs.writeFileSync(dbFilePath, JSON.stringify(deleteNote))

    readFile.json(deleteNote)
});


//-------------------- HTML Routes --------------------//

//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

//Other
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});


//-------------------- Start Server --------------------//
//Connect the front end and back end
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
