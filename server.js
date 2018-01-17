const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./db/db.js')

app.use(bodyParser.urlencoded({extended:false}));

const authorController = require('./controllers/authorController.js');
app.use('/authors', authorController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(3000, ()=>{
  console.log('listening....');
});