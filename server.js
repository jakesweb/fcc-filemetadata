'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser());
var upload = multer({ dest: 'uploads/' })

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse/', upload.single('upfile'), function(req, res, next) {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
  next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
