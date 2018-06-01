var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var Schema = mongoose.Schema;
var multer = require('multer');
var fs = require('fs');


var upload = multer({
  dest: '/uploads/'
})

var exif = require('jpeg-exif');
var User = require('./models/User');
var Image = require('./models/Image');
var Images = require('./models/Images');
var cors = require('cors');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/geotag', (err, res) => {
  if (err)
    console.log("Error in connection with MongoDB!")
  console.log("Connection has been added.");
})

app.use(cors());
app.use(bodyparser.json());
/*app.use(multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename;
  },
 }));
*/
app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
  res.send("hello");
})

app.post('/register', (req, res) => {
  let user = new User();
  user.login = req.body.login;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save((err, result) => {
    if (err) {
      console.log("Error in adding user to database!");
      res.send({
        success: "Failed to add user",
        status: 500
      });
    } else
      res.send({
        success: "Successfully added user",
        status: 200
      });
  })
})

app.post('/uploadImage', upload.any(), (req, res, next) => {
  let images = new Images();
  for (let i = 0; i < req.files.length; i++) {
    let data = exif.parseSync('/uploads/' + req.files[i].filename);
    data = data['GPSInfo'];
    let info = {
      'lat': data.GPSLatitude[0] + data.GPSLatitude[1] / 60 + data.GPSLatitude[2] / 3600,
      'lon': data.GPSLongitude[0] + data.GPSLongitude[1] / 60 + data.GPSLongitude[2] / 3600
    }
    if (data.GPSLatitudeRef === 'S')
      info['lat'] = -info['lat'];
    if (data.GPSLongitudeRef === 'W')
      info['lon'] = -info['lon'];

    let path = '/uploads/' + req.files[i].filename;
    let image = new Image();
    image.name = req.files[i].filename;
    image.path = path;
    image.lat = info['lat'];
    image.lon = info['lon'];
    var bitmap = fs.readFileSync(req.files[i].path);
    image.img.data = new Buffer(bitmap).toString('base64');
    image.img.contentType = "image/jpeg";
    images.arrayImages[i] = image;
  };

  images.save((err, result) => {
    if (err) {
      console.log("Error in adding image to database!");
      res.send({
        success: "Failed to add images",
        status: 500
      });
    } else
      res.send({
        success: "Successfully added images ",
        status: 200
      })
  })
});

app.post('/upload', upload.any(), (req, res, next) => {
  console.log(req.files.length);
  let images = new Images();
  for (let i = 0; i < req.files.length; i++) {
    let data = exif.parseSync('src/assets/uploads/' + req.files[i].filename);
    data = data['GPSInfo'];
    let info = {
      'lat': data.GPSLatitude[0] + data.GPSLatitude[1] / 60 + data.GPSLatitude[2] / 3600,
      'lon': data.GPSLongitude[0] + data.GPSLongitude[1] / 60 + data.GPSLongitude[2] / 3600
    }
    if (data.GPSLatitudeRef === 'S')
      info['lat'] = -info['lat'];
    if (data.GPSLongitudeRef === 'W')
      info['lon'] = -info['lon'];

    let path = 'assets/uploads/' + req.files[i].filename;
    let image = new Image();
    image.name = req.files[i].filename;
    image.path = path;
    image.lat = info['lat'];
    image.lon = info['lon'];
    images.arrayImages[i] = image;
  }

  images.save((err, result) => {
    if (err) {
      console.log("Error in adding image to database!");
      res.send({
        success: "Failed to add images",
        status: 500
      });
    } else
      res.send({
        success: "Successfully added images ",
        status: 200
      })
  })
});


app.get('/images', (req, res) => {
  Images.find((err, images) => {
    if (err)
      return res.status(500).send(err)

    return res.status(200).send(images);
  });
});

app.get('/allimages', (req, res) => {
  Images.find((err, images) => {
    if (err)
      return res.status(500).send(err)

    return res.status(200).send(images);
  });
});


app.get('/login', (req, res) => {
  User.find((err, image) => {
    if (err)
      return res.status(500).send(err)

    return res.status(200).send(image);
  });
});

app.listen(app.get('port'), (err, res) => {
  console.log("Server is running on port", app.get('port'));
});
