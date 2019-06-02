module.exports = async function(app) {
    var mongoose = require('mongoose'); // database manager
    mongoose.connect('mongodb+srv://user:2PDUHVxsxcM32v5W@take-note-bdeof.mongodb.net/Take-note?retryWrites=true&w=majority', { useNewUrlParser: true });
    var bodyParser = require('body-parser').urlencoded({ extended: false });

    var Page = require('../modules/pages');


    app.post('/save', bodyParser, (req, res) => {
        savePage(req.body.pageName, req.body.page);
    });







    function savePage(title, body) {
        var page = { owner: 1, title: title, body: body };
        Page(page).save((err) => {
            if (err) console.log(err);
            else console.log('success');
        })
    }

}