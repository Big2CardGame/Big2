var path = require('path');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    })

    // perhaps there will be a second route for a help page? dummy route here.
    // app.get("/help", (req,res) => {
    //    res.sendFile(path.join(__dirname, "../public/help.html"));
    // })
}