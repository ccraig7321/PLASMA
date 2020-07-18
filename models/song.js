module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,  
      }
    });
    Song.associate = function(models) {
        Song.belongsTo(models.Genre, {
          foreignKey: {
            allowNull: false
          }
        });
      }; 
    Song.associate = function(models) {
        Song.belongsTo(models.Artist, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    // Song.associate = function(models) {
    //     Song.hasMany(models.PlaylistSong, {
    //         onDelete: "cascade"
    //     });
    // };
    return Song;
};

  