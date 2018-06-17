var express = require('express');
var app = express();

// require models for any functions defined 
var db = require("../models");

// export routes for the server
// these routes are used to communicate with the database!
// The url created in the app.get / app.post will be used in the JS file 
// $.ajax({
    //method: POST,
  //  url: "api/etcetc"
//})
module.exports = (app) => {
    // get request needed for player
    app.get("/api/allPlayers", (res,req) => {
        db.Player.findAll({})
        .then(players => {
            res.json(JSON.parse(players));
        })
    })
    // get request for board
    app.get("/api/inPlay", (res,req) => {
        db.Board.findAll({})
        .then(board => {
            res.json(JSON.parse(board))
        })
    })
    // post request for player table
    app.post("/api/player", (res,req) => {
        db.Player.create({
            hand: JSON.stringify(req.body.hand)
        })
        .then(player => {
            res.json(player)
        })
    })
    // post request for board table 
    app.post("/api/board", (res,req) => {
        // code here to "post" a player move to the "board"
        db.Board.create({
            inPlay: JSON.stringify(req.body.inPlay)
        })
        .then(board => {
            res.json(board)
        })
    })
    //app.put ... update?
}