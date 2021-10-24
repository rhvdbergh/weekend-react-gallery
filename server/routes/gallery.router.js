const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js');
const fs = require('fs');

// DO NOT MODIFY THIS FILE FOR BASE MODE

// PUT Route
router.put('/like/:id', (req, res) => {
  console.log(req.params);
  const galleryId = req.params.id;

  // build the SQL query
  let queryText = `
    UPDATE "gallery"
    SET "likes" = "likes" + 1
    WHERE "id" = $1; 
  `;

  // parameterize the input
  let values = [galleryId];

  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(200); // let the user know the response was correct
    })
    .catch((err) => {
      console.log(
        `There was an error connecting to the PostgreSQL server:`,
        err
      );
      res.sendStatus(500); // let the client know there was an error
    });
}); // END PUT Route

// GET Route
router.get('/', (req, res) => {
  // build sql query
  let queryText = `
  SELECT * FROM "gallery" ORDER BY "id";
  `;

  pool
    .query(queryText)
    .then((response) => {
      // send the data, which in this case is response.rows
      res.send(response.rows); // let the client know there was an error
    })
    .catch((err) => {
      console.log(
        `There was an error connecting to the PostgreSQL server:`,
        err
      );
      res.sendStatus(500); // let the client know there was an error
    });
}); // END GET Route

// POST Route
router.post('/', (req, res) => {
  console.log(`POST /gallery, with req.body=`, req.body);
  // build the sql query
  let queryText = `
    INSERT INTO "gallery"
    ("path", "description")
    VALUES
    ($1, $2)
  `;

  // parameterize the inputs
  let values = [req.body.path, req.body.description];

  // run the sql query
  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(201); // tell the client the db item was created
    })
    .catch((err) => {
      console.log(
        `There was an error connecting to the PostgreSQL server:`,
        err
      );
      res.sendStatus(500); // let the client know there was an error
    });
}); // END Post

// POST Route to upload file(s)
router.post('/upload', (req, res) => {
  console.log(`req.files`, req.files);
  // set the filename and the directory to store the image
  const fileName = `./server/images/${req.files.file.name}`;
  // write the image to the server
  fs.writeFile(fileName, req.files.file.data, () => {});
  res.sendStatus(204);
}); // END POST to upload files

// DELETE Route
router.delete(`/:id`, (req, res) => {
  // build the sql query
  let queryText = `
    DELETE FROM "gallery"
    WHERE "id" = $1;
  `;

  // parameterize the input
  let values = [req.params.id];

  // run the sql query
  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(204); // tell the client the db item was deleted
    })
    .catch((err) => {
      console.log(
        `There was an error connecting to the PostgreSQL server:`,
        err
      );
      res.sendStatus(500); // let the client know there was an error
    });
}); // end DELETE Route

module.exports = router;
