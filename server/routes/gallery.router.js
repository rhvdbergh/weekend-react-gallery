const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js');

// DO NOT MODIFY THIS FILE FOR BASE MODE

// PUT Route
router.put('/like/:id', (req, res) => {
  console.log(req.params);
  const galleryId = req.params.id;
  for (const galleryItem of galleryItems) {
    if (galleryItem.id == galleryId) {
      galleryItem.likes += 1;
    }
  }
  res.sendStatus(200);
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
      res.send(response.rows);
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
