var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  }
})

var Image = module.exports = mongoose.model('Image', imageSchema);
