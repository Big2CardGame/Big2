// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
// need this in order for css files/ js files to work
app.use(express.static(path.join(__dirname, 'public')));
// Routes
// =============================================================
// could be changed so all js files in the routes folder will use express.Router
// then below would change to 
// app.use("url", "route from ./routes/jsFile")
// ie
// app.use("/", "./routes/htmlRoutes")
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

