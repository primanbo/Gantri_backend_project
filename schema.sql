CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL, 
  age INTEGER NOT NULL, 
  location VARCHAR(50) NOT NULL
);

CREATE TABLE art (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL, 
  artist VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL 
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  artid INTEGER REFERENCES art(id) NOT NULL,
  userid INTEGER REFERENCES users(userid),
  name VARCHAR(50) NOT NULL, 
  content VARCHAR(50) NOT NULL 
);



COPY art (id, title, artist, year) FROM 'the-tate-collection.csv' WITH (FORMAT csv, DELIMITER ';', HEADER);