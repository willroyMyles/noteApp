var express = require('express');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');


// const el = document.querySelector('.draggable');
//     const options = {
// 	    constrain: true,
// 	    handle: document.querySelector('.handle'),
// 	    relativeTo: document.querySelector('.box-1')
//     };
// var dis = displace(el, options);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log("listening on port "+ port);


//set up routes

app.get('/index', (req, res)=>{
    res.render('index');
});
app.get('/', (req, res)=>{
    res.render('index');
});