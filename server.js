const express = require('express');
const app = express();

app.get('/', (req, res)=>{
  res.render('index.ejs');
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(3000, ()=>{
  console.log('listening....');
});