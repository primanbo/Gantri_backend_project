CREATE TEMP TABLE temp_table (
  id INTEGER,
  accession_number TEXT,
  artist TEXT,
  artistRole TEXT,
  artistId INTEGER,
  title TEXT,
  dateText TEXT,
  medium TEXT,
  creditLine TEXT,
  year INTEGER,
  acquisitionYear INTEGER,
  dimensions TEXT,
  width INTEGER,
  height INTEGER,
  depth TEXT,
  units TEXT,
  inscription TEXT,
  thumbnailCopyright TEXT,
  thumbnailUrl TEXT,
  url TEXT
);

\COPY temp_table (id, accession_number, artist, artistRole, artistId, title, dateTEXT, medium, creditLine, year, acquisitionYear, dimensions, width, height, depth, units, inscription, thumbnailCopyright, thumbnailUrl, url) FROM '/home/ubuntu/data/the-tate-collection.csv' WITH (FORMAT csv, DELIMITER ';', HEADER);

INSERT INTO art (id, artist, title, year)
SELECT id, artist, title, year
FROM temp_table;

DROP TABLE temp_table;
