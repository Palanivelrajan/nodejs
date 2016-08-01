var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Log all requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(__dirname)); 

// Parse request body into req.body.*
app.use(urlencodedParser);

// Route for specific URLs
app.get('/books', function(req, res){
  res.send('A list of books goes here');
});

// A specific book by ID
app.get('/books/:id', function(req, res){
  var html = "<p>You requested book <b>" + req.params.id + "</b>.</p>"
  res.send(html);
});

// Search form (GET)
app.get("/search", function(req, res) {
  var html = '<p>' + 
    '<form id="search" method="post">' + 
    '  Enter something: ' +
    '  <input type="text" name="searchText"/>' +
    '  <input type="submit"/>' + 
    '</form>' + 
    '</p>';
  res.send(html)
});

// Search form (POST)
app.post("/search", urlencodedParser, function(req, res) {
  var searchText = req.body.searchText;
  res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
});


// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');

