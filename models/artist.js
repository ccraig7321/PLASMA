module.exports = function(sequelize, DataTypes) {
    var Artist = sequelize.define("Artist", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    Artist.associate = function(models) {
        Artist.hasMany(models.Song, {
            onDelete: "cascade"
        });
    };
    return Artist;
};

  