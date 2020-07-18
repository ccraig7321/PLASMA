module.exports = function(sequelize) {
  var PlaylistSong = sequelize.define("PlaylistSong", {});

  // Associate with Playlist
  PlaylistSong.associate = function(models) {
    PlaylistSong.belongsTo(models.Playlist, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Associate with Song
  PlaylistSong.associate = function(models) {
    PlaylistSong.belongsTo(models.Song, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return PlaylistSong;
};
