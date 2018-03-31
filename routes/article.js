var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var Article = require('../models/articles');

// middleware that is specific to this router
// router.use(function timeLog (req, res) {
//     console.log('Time: ', Date.now())
//     // next()
//   });

/* GET home page. */
router.get('/onion', function(req, res) {

    request('https://www.theonion.com/', function (error, response, html) {
        
        // Load the body of the HTML into cheerio
        var $ = cheerio.load(html);
        
        // Empty array to save our scraped data
        var results = [];

        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $("h1.entry-title").each(function(i, element) {

            // console.log(element);
            // Save the text of the h4-tag as "title"
            var title = $(element).text();
            var link = $(element).children().attr('href');

            // Make an object with data we scraped for this h4 and push it to the results array
            results.push({
                title: title,
                link: link
            });
        
        })
    // res.render('index', { title: 'Mongo Scraper' });
    res.send(results);
    });
});
/* GET home page. */
router.post('/onion', function(req, res) {

    Article.create(req.body).then(function(article) {
        request('https://www.theonion.com/', function (error, response, html) {
            
            // Load the body of the HTML into cheerio
            var $ = cheerio.load(html);
            
            // Empty array to save our scraped data
            var results = [];
    
            // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
            $("h1.entry-title").each(function(i, element) {
    
                // console.log(element);
                // Save the text of the h4-tag as "title"
                var title = $(element).text();
                var link = $(element).children().attr('href');
    
                // Make an object with data we scraped for this h4 and push it to the results array
                results.push({
                    title: title,
                    link: link
                });
            })
        // res.render('index', { title: 'Mongo Scraper' });
        res.send(results);
        });
    });

});


module.exports = router;