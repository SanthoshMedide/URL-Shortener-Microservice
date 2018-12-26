var mongoose = require('mongoose');

// Category Schema
var urlShortenerSchema = mongoose.Schema({
   
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    },
    time : { 
    	type : Date, 
    	default: Date.now 
    }
    
});

var urlShortenerModel = module.exports = mongoose.model('urlShortenerModel', urlShortenerSchema);

