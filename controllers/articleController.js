const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');
const Author = require('../models/author.js')

router.get('/', (req, res)=>{
  Article.find({}, (err, foundArticles)=>{
    res.render('articles/index.ejs', {
      articles: foundArticles
    });
  })
});

router.get('/new', (req, res)=>{
    Author.find({}, (err, allAuthors)=>{
        res.render('articles/new.ejs', {
            authors: allAuthors
        });
    });
});

router.get('/:id', (req, res)=>{
    Article.findById(req.params.id, (err, foundArticle)=>{
        Author.findOne({'articles._id':req.params.id}, (err, foundAuthor)=>{
            res.render('articles/show.ejs', {
                author:foundAuthor,
                article: foundArticle
            });
        })
    });
});

router.post('/', (req, res)=>{
    Author.findById(req.body.authorId, (err, foundAuthor)=>{
        Article.create(req.body, (err, createdArticle)=>{ //req.body.authorId is ignored due to Schema
            foundAuthor.articles.push(createdArticle);
            foundAuthor.save((err, data)=>{
                res.redirect('/articles');
            });
        });
    });
});

router.get('/:id/edit', (req, res)=>{
  Article.findById(req.params.id, (err, foundArticle)=>{
    res.render('articles/edit.ejs', {
      article: foundArticle
    });
  });
});

router.delete('/:id', (req, res)=>{
    Article.findByIdAndRemove(req.params.id, (err, foundArticle)=>{
        Author.findOne({'articles._id':req.params.id}, (err, foundAuthor)=>{
            foundAuthor.articles.id(req.params.id).remove();
            foundAuthor.save((err, data)=>{
                res.redirect('/articles');
            });
        });
    });
});

router.put('/:id', (req, res)=>{
    Article.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedArticle)=>{
        Author.findOne({ 'articles._id' : req.params.id }, (err, foundAuthor)=>{
            foundAuthor.articles.id(req.params.id).remove();
            foundAuthor.articles.push(updatedArticle);
            foundAuthor.save((err, data)=>{
                res.redirect('/articles/'+req.params.id);
            });
        });
    });
});

module.exports = router;