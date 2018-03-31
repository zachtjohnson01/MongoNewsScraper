var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: String,
    Summary: String,
    URL: String
});

var Article = mongoose.model('article', ArticleSchema);

module.exports = Article;