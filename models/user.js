// TODO? // Need to require bcrypt if using password hashing

// User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // TODO? // Need method to check unhashed password in user input compared to hashed password stored in database

    // TODO? // Need hook to automatically hash password before User is created

    // Associating User with Playlists
    User.associate = function(models) {
        User.hasMany(models.Playlist, {
            onDelete: "cascade"
        });
    };

    return User;
};
