INSERT INTO Users (username, password, createdAt, updatedAt) VALUES ("SEGH", "notSecureYet123", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Playlists (name, createdAt, updatedAt, UserId) VALUES ("Stayin' At Home", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
INSERT INTO Artists (name, createdAt, updatedAt) VALUES ("Great Singer", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Genres (name, createdAt, updatedAt) VALUES ("Good Tunes", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Songs (title, createdAt, updatedAt, ArtistId, GenreId) VALUES ("Great Song", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);
INSERT INTO PlaylistSongs (createdAt, updatedAt, PlaylistId, SongId) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);