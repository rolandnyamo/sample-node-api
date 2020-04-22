var express = require('express');
var router = express.Router();
var r = require('../utils/methods')

/* GET home page. */
router.get('/', function(req, res, next) {

  var context = r(req)

  res.json(context);
});

router.put('/', function(req, res, next) {

  var context = r(req)

  res.json(context);
});

router.post('/', function(req, res, next) {

  var context = r(req)

  res.json(context);
});

router.delete('/', function(req, res, next) {

  var context = r(req)

  res.json(context);
});

module.exports = router;
