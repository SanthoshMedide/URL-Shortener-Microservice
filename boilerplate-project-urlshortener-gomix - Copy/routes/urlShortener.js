var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dns = require('dns');
var validUrl = require('valid-url');
var urlShortenerModel = require('../models/urlShortener.js');


router.get('/:id',function(req,res){
	var shortenedUrl = req.params.id;
	if(shortenedUrl){
		urlShortenerModel.findOne({short_url:shortenedUrl},function(err, url){
			if(!url){
				res.json({message: "URL not found"});
			}else{
				var redirect_url = url.original_url;
				res.redirect(redirect_url);
			}
		});
	}
});

router.post('/new',function(req, res){
	var urlToShorten = req.body.url;
	urlToShorten = urlToShorten.replace(/^\s+|\s+$/g, "");
	if(validUrl.isUri(urlToShorten)){
		urlShortenerModel.findOne({original_url:urlToShorten},function(err, url){
			if(url){
				res.json({
							"original_url": urlToShorten,
							"short_url" : url.short_url
				});

			}else{
				var randomnumber = Math.floor(Math.random() * 10000);
				var newUrl = new urlShortenerModel({
					original_url : urlToShorten,
					short_url : randomnumber
				});

				newUrl.save(function(err){
					if(err){
						console.log("error saving file");
					}
					else{
						res.json({
							"original_url": urlToShorten,
							"short_url" : randomnumber
						});
					}
				});
			}
		});
		
	}
	else{
		res.json({"error":"invalid URL"});
	}

});

module.exports = router;

