  var express = require('express');
  var router = express.Router();
  
  var request = require('request');
  var cheerio = require('cheerio');
  var axios = require('axios');
  
  var Article = require('../models/article');

// A GET route for scraping the pehub website
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.pehub.com/section/news-digest/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h4 within an article > div tag, and do the following:
    $("article div h4").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return (err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;