var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    headline: String,
    Summary: String,
    URL: String
});
mongoose.model('Article', articleSchema);