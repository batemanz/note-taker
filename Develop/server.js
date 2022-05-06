const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const PORT = 3001;
const randomChar = require('./helpers/uuid');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// unit 20 week 11 data persistance-- pay attention fs.readFile

app.get('/api/notes', (req, res) => {
  let noteValue = db;
  res.json(noteValue);
});

app.post('/api/notes',(req, res) => {

  req.body.id = db.length + 1;
  let notes = db;
  let noteIn = req.body;

  notes.push(noteIn);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notes, null, 2)
  );

  res.json(noteIn);

  // const { title, text } = req.body;
  // const newNote = {
  //   title,
  //   text,
  //   id: uuidv1(),
  // };

  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     // Convert string into JSON object
  //     const parsedNote = JSON.parse(data);

  //     // Add a new review
  //     parsedNote.push(newNote);

  //     // Write updated reviews back to the file
  //     fs.writeFile(
  //       './db/db.json',
  //       JSON.stringify(parsedNote, null, 4),
  //       (writeErr) =>
  //         writeErr
  //           ? console.error(writeErr)
  //           : console.info('Successfully updated notes!')
  //     );
  //   }
  // });

});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});