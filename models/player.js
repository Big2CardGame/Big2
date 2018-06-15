// This code defines a player for the game_db
// currently, the player model has a row for each card in the player's hand,
// in each row, there is a column for the value and suite of a card
// for example, the 3 of clubs would have value 3, suite C.
// hopefully, we can use this player model to create multiple players for the game (up to 4).
module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define('Player', {
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {}
        }, 
        suite: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {}
        }
    })

    // Player.associate = function(models) {};

    return Player;
}
