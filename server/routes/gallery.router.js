const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js');

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

module.exports = router;
