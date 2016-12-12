var express = require('express');
var router = express.Router();

var car = require('../models/car.js');

/* GET cars listing for user */
router.get('/', function(req, res, next) {
  res.render('cars', { title: 'Cars index' });
  // res.send('This is cars index page. <insert cars data here>');
});

module.exports = router;