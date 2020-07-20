const Song = require("./song.js");
const Playlist = require("./playlist.js");

// PlaylistSong model
module.exports = function(sequelize, DataTypes) {
    var PlaylistSong = sequelize.define("PlaylistSong", {
      PlaylistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Playlist,
            key: 'id'
        }
      },
      SongId: {
          type: DataTypes.INTEGER,
          references: {
              model: Song,
              key: 'id'
          }
      }
    });
    return PlaylistSong;
  };
  