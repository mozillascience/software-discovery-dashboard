var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: "Software Discovery Dashboard" });
});

module.exports = router;
