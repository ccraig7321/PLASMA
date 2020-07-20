module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistName: {
      type: DataTypes.STRING,
    }
  });

  Song.associate = function(models) {
    Song.belongsToMany(models.Playlist, {
      through: PlaylistSongs
    });
  };
  return Song;
};
