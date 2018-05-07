var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var User = require('./models/User');
var cors = require('cors');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/geotag', (err, res) => {
  if (err)
    console.log("Error in connection with MongoDB!")
    console.log("Connection has been added.");
})

app.use(cors());
app.use(bodyparser.json());
app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
  res.send("hello");
})

app.post('/register', (req, res) => {
  var login = req.body.login;
  var password = req.body.password;
  var email = req.body.email;

  var user = new User();
  user.login = login;
  user.password = password;
  user.email = email;

  user.save((err, result) => {
    if (err) {
      console.log("Error in adding user to database!");
      res.send({success: "failed to add user", status: 500});
    }
    else
      res.send({success: "Successfully added user", status: 200});
  })
})


app.listen(app.get('port'), (err, res) => {
  console.log("Server is running on port", app.get('port'));
});
