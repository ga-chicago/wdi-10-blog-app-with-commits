const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('articles/index.ejs');
});

router.get('/new', (req, res)=>{
  res.render('articles/new.ejs');
});

module.exports = router;