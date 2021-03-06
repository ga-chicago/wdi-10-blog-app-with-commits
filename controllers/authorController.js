const express = require('express');
const router = express.Router();

const Author = require('../models/author.js');
const Article = require('../models/article.js');


router.get('/', (req, res)=>{
  Author.find({}, (err, foundAuthors)=>{
    res.render('authors/index.ejs', {
      authors: foundAuthors
    });
  })
});

router.get('/new', (req, res)=>{
  res.render('authors/new.ejs');
});

//avoid this handling /new by placing it below the /new route
router.get('/:id', (req, res)=>{
  Author.findById(req.params.id, (err, foundAuthor)=>{
    res.render('authors/show.ejs', {
      author: foundAuthor
    });
  });
});

router.get('/:id/edit', (req, res)=>{
  Author.findById(req.params.id, (err, foundAuthor)=>{
    res.render('authors/edit.ejs', {
      author: foundAuthor
    });
  });
});

router.post('/', (req, res)=>{
  Author.create(req.body, (err, createdAuthor)=>{
    res.redirect('/authors');
  });
});

router.delete('/:id', (req, res)=>{
  Author.findByIdAndRemove(req.params.id, (err, foundAuthor)=>{
    const articleIds = [];
    for (let i = 0; i < foundAuthor.articles.length; i++) {
      articleIds.push(foundAuthor.articles[i]._id);
    }
    Article.remove(
      {
        _id : {
          $in: articleIds
        }
      },
      (err, data)=>{
        res.redirect('/authors');
      }
    );
  });
});

router.put('/:id', (req, res)=>{
  Author.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/authors');
  });
});

module.exports = router;