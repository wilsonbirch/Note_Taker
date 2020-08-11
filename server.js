
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const generateUniqueId = require('generate-unique-id');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public",express.static("public"));


//Displays all notes
app.get("/api/notes", function(req, res) {
  fs.readFile('db/db.json', 'utf8', function(err, d) {
    let savedNotes = JSON.parse(d);
    res.send(savedNotes);
  });
});

//Posts typed Note w text and generates a unique ID
app.post("/api/notes", function(req, res) {
  fs.readFile("db/db.json", function(err,data) {
    
    //check for error
    if (err) throw err;

    //generate ID
    let idValue = generateUniqueId({
      length: 3,
      useLetters: false
    });

    //set data as a variable (json) and new note data
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: idValue
    }

    //push new note to json
    json.push(note);

    //rewrite updated json file to array
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), function (err)  {
      if (err) throw err;
      res.send('200');
    });
  });
});

//delete notes
app.delete("/api/notes/:id", function (req, res) {

  fs.readFile("db/db.json", function (err, data) {

    // check for error
    if (err) throw err;
      let deleteId = req.params.id;

      let json = JSON.parse(data);

      json.forEach((item, j) =>{
        if (item.id.includes(deleteId)){ 
          json.splice(j, 1);       
        }
      });
    
      // Write updated json to array 
      fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
        // Check for error
        if (err) throw err;
        res.send('200');
      });
    });
    
});
  
  

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

//need route for heroku app
app.get("/", function(req, res) {
  res.json(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname, 'public')));

//starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });