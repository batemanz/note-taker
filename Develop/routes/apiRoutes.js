const noteRoute = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


noteRoute.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, noteData) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(noteData);

      const parsedNotes = JSON.parse(noteData);
      res.json(parsedNotes);
    }
  });
});

noteRoute.post("/notes", (req, res) => {
  const { title, text } = req.body;
  // get new notes --request
  // use ID
  // read existing db.json
  // parse the data
  // write to the file
  // fs.writefile will replace anything previous
  //
  if (req.body) {
    const noteNew = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile("./db/db.json", "utf8", (err, noteData) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(noteData);
        parsedNotes.push(noteNew);

        fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 2), (err) =>
          err
            ? console.error(err)
            : console.info(`\nData has been written to ${"./db/db.json"}`)
        );
      }
    });
    res.json("added note succesfully");
  } else {
    res.error("adding note Unsuccesful");
  }
});

noteRoute.delete("/notes/:id", (req, res) => {

});

module.exports = noteRoute;
