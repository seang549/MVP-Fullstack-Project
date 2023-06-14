  \c movies_checklist;

  DROP TABLE IF EXISTS movies_to_watch;

  CREATE TABLE movies_to_watch (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    director VARCHAR(255),
    release_year INTEGER,
    genre VARCHAR(255),
    rating INTEGER
);

INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('The Shawshank Redemption', 'Frank Darabont', 1994, 'Drama', 9.3);
INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('The Godfather', 'Francis Ford Coppola', 1972, 'Crime, Drama', 9.2);
INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime,Drama', 8.9);
INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('The Dark Knight', 'Christopher Nolan', 2008, 'Action, Crime, Drama', 9.0);
INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('Inception', 'Christopher Nolan', 2010, 'Action, Adventure, Sci-Fi', 8.8);
INSERT INTO movies_to_watch (title, director, release_year, genre, rating) VALUES ('Fight Club', 'David Fincher', 1999, 'Drama', 8.8);