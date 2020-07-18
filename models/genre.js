module.exports = function(sequelize, DataTypes) {
    var Genre = sequelize.define("Genre", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    Genre.associate = function(models) {
        Genre.hasMany(models.Song, {
            onDelete: "cascade"
        });
    };
    // Genre.associate = function(models) {
    //     Genre.belongsTo(models.Song, {
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    // };
    return Genre;  
};
  