
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public",express.static("public"));


// Routes
// =============================================================

// Basic route that sends the user first to the notes Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

//Sends user to the initial index.html page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", function(req, res) {
  res.json(path.join(__dirname, "index.html"));
});

 //Displays all notes
//app.get("/api/notes", function(req, res) {
  //let rawNotes = fs.readFileSync("db/db.json");
  //let finalNotes = JSON.parse(rawNotes);
  //return res.json(finalNotes);
//});

//app.post("/api/notes", function(req, res) {
  //let rawNotes = fs.readFileSync("db/db.json");
  //let newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newNote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newNote.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  //console.log(newNote);

  //rawnotes.push(newNote);

  //res.json(newNote);
//});

//starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });