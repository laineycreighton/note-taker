const notesRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dbFilePath = "./db/db.json";

//========== GET NOTES ==========//
notesRouter.get("/notes", (req, res) => {
    fs.readFile(dbFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error reading notes from the database." });
      }
      const notes = JSON.parse(data);
  
      res.json(notes);
    });
  });

//========== CREATE NOTE ==========//
//POST
notesRouter.post("/notes", (req, res) => {
    console.log(`${req.method} request received to add the new note`);
    // destructuring assignment for the items in req.body
    const { title, text } = req.body;
    // if all the required properties are present
    if (!title || !text) {
      return;
      res
        // bad request - contains invalid data
        .status(400)
        .json({ error: "Please, provide a valid title and text for the note." });
    }
    // fs read-file
    fs.readFile(dbFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
        res
          // server-side error 500
          .status(500)
          .json({ error: "Error reading notes from the database" });
      }
  
      const notes = JSON.parse(data);
      const newNote = {
        // generate a unique id for each note that a user inputs
        id: uuidv4(),
        title,
        text,
      };
      // push the content
      notes.push(newNote);
      console.log(notes);
      // fs write-file
      fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return (
            res
              // server-side error 500
              .status(500)
              .json({ error: "Error writing note to the database." })
          );
        }
        res.json(newNote);
      });
    });
  });
  // });

  //========== DELETE NOTE ==========//
  //DELETE
  notesRouter.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    // read file
    fs.readFile(dbFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(500) // server-side error 500
          .json({ error: "Error reading notes from the database." });
      }
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== noteId);
      // write file
      fs.writeFile(dbFilePath, JSON.stringify(filteredNotes), (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500) // server-side error 500
            .json({ error: "Error writing notes to the database." });
        }
        res.json({ message: "Note deleted successfully." });
      });
    });
  });
  
  module.exports = notesRouter;


//   //-------------------- API Routes --------------------//

// //Get all notes
// app.get('/api/notes', (req, res) => {
//     fs.readFile(dbFilePath, (err, data) => {
//       if (err) throw err;
//       let dbData = JSON.parse(data);
//       res.json(dbData)
//     });
//   });
  
//   //Create a new note
//   app.post('/api/notes', (req, res) => {
//     const newNote = req.body;
//     db.push(newNote)
  
//     fs.writeFileSync(dbFilePath, JSON.stringify(db))
  
//     res.json(db)
//   });
  
//   //Delete a note
//   app.delete('/api/notes/:id', (req, res) => {
//     const deleteNote = db.filter((note) =>
//       note.id !== parseInt(req.params.id))
  
//       fs.writeFileSync(dbFilePath, JSON.stringify(deleteNote))
  
//       readFile.json(deleteNote)
//   });