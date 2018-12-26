// 'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

var config = require('./config/database.js');
var shortenTheUrl = require('./models/urlShortener.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Basic Configuration 
var port = 3000;

/** this project needs a db !! **/ 
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongo");
});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

// app.post('/api/shorturl/new', function(req,res){
// 	console.log("err");
// 	console.log("hh"+req.body.url);
// 	res.json({g:"g"});
// });

var urlShortenerRoute = require('./routes/urlShortener.js');

app.use('/api/shorturl',urlShortenerRoute);
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});