CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "path" VARCHAR(100) NOT NULL, 
  "description" VARCHAR(250), 
  "likes" INT DEFAULT 0
  );

INSERT INTO "gallery" ("path", "description")
VALUES ('images/goat_small.jpg', 'Photo of a goat taken at Glacier National Park.'),
('images/goat_small.jpg', 'Photo of another goat taken at Glacier National Park.'),
('images/goat_small.jpg', 'Photo of yet another goat taken at Glacier National Park.');

