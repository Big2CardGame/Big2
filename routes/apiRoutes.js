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
    app.get("/api/allPlayers", (req,res) => {
        db.Player.findAll({})
        .then(players => {
            res.json(players);
        })
    })
    // get request for board
    app.get("/api/inPlay", (req,res) => {
        db.Board.findAll({})
        .then(board => {
            res.json(board)
        })
    })
    // post request for player table
    app.post("/api/player", (req,res) => {
        console.log(req.body);
        db.Player.create({
            hand: req.body.hand
        })
        .then(player => {
            res.json(player);
        })
    })
    // post request for board table 
    app.post("/api/board", (req,res) => {
        // code here to "post" a player move to the "board"
        db.Board.create({
            inPlay: req.body.inPlay
        })
        .then(board => {
            res.json(board)
        })
    })
    //app.put ... update?
}