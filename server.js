const express = require('express');
const app = express();

require('./db/db.js')

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