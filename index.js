var express = require('express');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser').urlencoded({ extended: false });


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);
console.log("listening on port " + port);


//set up routes

app.get('/index', (req, res) => {
    res.render('index');
});
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/save', bodyParser, (req, res) => {
    console.log(req.body);
});