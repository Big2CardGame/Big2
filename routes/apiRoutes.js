var express = require('express');
var app = express();

// require models for any functions defined 
var db = require("../models");

// export routes for the server
module.exports = (app) => {
    // post requests needed for the table

    // clubs spades hearts diamonds
    // first card is a 3 of clubs
    // use server side validation to keep the flow of the game/
    // random place for game notes lol
    app.get("/game:id/player:number/", (res,req) => {
        // code here to populate players hands with Deck of Cards api
    })

    app.post("/game:id/table", (res,req) => {
        // code here to "post" a player move to the "table"
    })
}