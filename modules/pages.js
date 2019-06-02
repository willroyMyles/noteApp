var mongoose = require('mongoose');

module.exports = mongoose.model('Page', {
    owner: String,
    title: String,
    body: Object
});