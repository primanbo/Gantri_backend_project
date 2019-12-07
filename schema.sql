CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL, 
  age INTEGER NOT NULL, 
  location TEXT NOT NULL
);

CREATE TABLE art (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL, 
  artist TEXT NOT NULL,
  year INTEGER 
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  artid INTEGER REFERENCES art(id) NOT NULL,
  userid INTEGER REFERENCES users(id),
  name TEXT,
  content TEXT NOT NULL 
);

CREATE UNIQUE INDEX unique_name_when_userid_null
    ON comments
       (name)
 WHERE userid IS NULL;


COPY art (id, title, artist, year) FROM 'the-tate-collection.csv' WITH (FORMAT csv, DELIMITER ';', HEADER);