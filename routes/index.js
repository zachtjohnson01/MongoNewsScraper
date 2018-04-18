var express = require('express');
var router = express.Router();
const Article = require('../models/article');

/* GET home page. */
router.get("/", (req, res) => Article.find({}).sort({ _id: -1 })
.then(data => res.render("index", {new: data})).catch(err => res.json(err)));

module.exports = router;
