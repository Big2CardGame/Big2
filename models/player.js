// This code defines all players for the game_db
// currently, the player model has a row for each card in the player's hand,
// in each row, there is a column for every card that the player has in their hand
// they would be in the form of a stringified json object
// card info has two parts, the value and the suite.
// example hand: {3c, 4s, 5h, 6d, Jc, As,...}

module.exports = (sequelize, DataTypes) => {
    var Player = sequelize.define('Player', {
        hand: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {}
        }, 
    })

    // Player.associate = function(models) {};

    return Player;
}
