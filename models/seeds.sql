INSERT INTO Users (username, password, createdAt, updatedAt) VALUES ("SEGH", "notSecureYet123", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO Playlists (name, createdAt, updatedAt, UserId) VALUES ("Stayin' At Home", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
INSERT INTO Songs (title, artistName, createdAt, updatedAt) VALUES ("Great Song", "Great Singer", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);