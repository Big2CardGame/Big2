// This model represents the 'board' where players place their cards on their turn
// POST requests that UPDATE the board table 
// GET request to display that hand to the page/ players.

module.exports = (sequelize, DataTypes) => {
    var Board = sequelize.define('Board', {
        inPlay: {
            type: DataTypes.STRING,
            allowNull: false,
            //validate: {
                // insert code here that makes sure 
                // the only update that can take place
                // is made by the person who is next to go

            //}
        }
    })

    return Board;
}