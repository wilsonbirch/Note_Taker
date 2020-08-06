
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

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

 //Displays all notes
app.get("/api/notes", function(req, res) {
  console.log(json.title);
});

//starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });