CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "path" VARCHAR(250) NOT NULL, 
  "description" VARCHAR(250), 
  "likes" INT DEFAULT 0
  );

INSERT INTO "gallery" ("path", "description")
VALUES ('images/goat_small.jpg', 'Photo of a goat taken at Glacier National Park.'),
('images/goat_small.jpg', 'Photo of another goat taken at Glacier National Park.'),
('images/goat_small.jpg', 'Photo of yet another goat taken at Glacier National Park.'),
('https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg', 'Picture of a goat from Wikipedia. Photographer: Kuebi'),
('https://live.staticflickr.com/4074/4925106591_1333ec06f7_b.jpg', 'Goat in a market in Nigeria (photo credit: ILRI/Mann). Licensed: https://creativecommons.org/licenses/by-nc-nd/2.0/');
