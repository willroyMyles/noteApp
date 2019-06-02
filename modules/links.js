var mongoose = require('mongoose');

module.exports = mongoose.model('Link', {
    userid: String,
    pageId: String,
    text: String
});