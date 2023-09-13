//-------------------- Require Files & Packages --------------------//
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const routes = require('./public/routes/notes.js');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//CRUD Routes
app.use("/api", routes);


//-------------------- HTML Routes --------------------//

//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});


//-------------------- Start Server --------------------//
//Connect the front end and back end
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
