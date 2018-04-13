const express = require('express');
const router = express.Router();
const Authors = require('../models/authors');

router.get('/', (req, res) => {

  Authors.find((err, foundAuthors) => {

    if(err) console.log(err);
    console.log(foundAuthors, ' this is found Authors')

    res.render('authors/index.ejs', {authors: foundAuthors});
  });
});

router.post('/', (req, res) => {
  console.log('--------------------------')
  console.log(req.body)
  console.log('--------------------------')
  console.log('--------------------------')
  console.log(req.body.name)


  console.log('--------------------------')
  console.log('--------------------------')
  Authors.create(req.body, (err, createdAuthor) => {
    if(err) console.log(err);
    console.log(createdAuthor);
    res.redirect('/authors');
  });


});

router.get('/new', (req, res) => {
  res.render('authors/new.ejs');
});

router.get('/:id', (req, res) => {

  Authors.findById(req.params.id, (err, foundAuthor) => {
    if(err) console.log(err);
    console.log(foundAuthor)
    res.render('authors/show.ejs', {
      author: foundAuthor
    });
  });
});

router.delete('/:id', (req, res) => {
  Authors.findByIdAndRemove(req.params.id, (err, deletedAuthor) => {
    if(err) { 
      console.error(err);
      res.send("it didn't work check the console")
    }
    else {
      console.log(deletedAuthor)
      // send 'em back to the index
      res.redirect('/authors')
    }    
  })
})


module.exports = router;
