const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

require('./db/db.js')

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const authorController = require('./controllers/authorController.js');
app.use('/authors', authorController);
const articleController = require('./controllers/articleController.js');
app.use('/articles', articleController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(3000, ()=>{
  console.log('listening....');
});