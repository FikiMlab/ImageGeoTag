var mongoose = require('mongoose');

var oneImage = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  img: {
    data: String,
    contentType: String
  },
  lon: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  }
});

var imagesSchema = mongoose.Schema({
  arrayImages: [oneImage]
});

var Images = module.exports = mongoose.model('Images', imagesSchema);
