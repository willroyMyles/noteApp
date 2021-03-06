var express = require('express');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser').urlencoded({ extended: false });
start();

async function start() {

    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 8000;
    }
    app.listen(port);
    console.log("listening on port " + port);

    var control = require('./controllers/databaseController');
    control(app);


    //set up routes

    app.get('/index', (req, res) => {
        console.log(req.ip)
        res.render('index');
    });
    app.get('/', (req, res) => {
        console.log(req.ip)
        res.render('index');
    });

}