const express = require('express');
const router = express.Router();
const News = require('../models/newsDB');
const asyncHandler = require("express-async-handler");


router.get('/news', asyncHandler(async(req, res) => {
    const dispNews = await News.find();
    res.send(dispNews);
 }));

 router.post('/news', (req, res, next) => {
    const dispNews = req.body;

    if (req.body.news_title
        && req.body.news_article
        && req.body.news_picture 
        && req.body.news_author 
        && req.body.news_date 
        ) {
      News.create(req.body).then((data) => res.json(data)).catch(next);
      const dbNews = new News ({
        news_title: dispNews.news_title,
        news_article: dispNews.news_article,
        news_picture: dispNews.news_picture,
        news_author: dispNews.news_author,
        news_date: dispNews.news_date,
      })
      dbNews.save()
      res.json({message: "Success"})
    }
    else {
      res.json({
        error: 'The input field is missing',
      });
    }
})
router.delete('/news/:id', (req, res, next) => {
    News.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
});

router.route("/updateNews/:id").post(async function(req,res,next) {
    News.findById(req.params.id, async function(err, dispNews){
      if(!dispNews) { return next(new Error("Unable to find upcoming new with this id"))}
      else {
        
        if(req.body.news_title != null){ News.news_title = req.body.news_title; }
        if(req.body.news_article != null){ News.news_article = req.body.news_article; }
        if(req.body.news_picture != null){ News.news_picture = req.body.news_picture; }
        if(req.body.news_author != null){ News.news_author = req.body.news_author; }
        if(req.body.news_date != null){ News.news_date = req.body.news_date; }

        dispNews.save().then(emp => {
          res.json({
            _id: News._id,
            news_title: News.news_title,
            news_article: News.news_article,
            news_picture: News.news_picture,
            news_author: News.news_author,
            news_date: News.news_date,
          });
        }).catch(err => {
          res.status(400).send("Unable to update new");
        });
      }
    });
  });
module.exports = router;
