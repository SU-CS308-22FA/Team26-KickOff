const express = require('express');
const router = express.Router();
const UpcomingMatch = require('../models/upcomingMatches');
const asyncHandler = require("express-async-handler");


router.get('/upcomingmatches', asyncHandler(async(req, res) => {
    const upcomingmatches = await UpcomingMatch.find();
    res.send(upcomingmatches);
 }));
 router.post('/upcomingmatches', (req, res, next) => {
  const upcomingmatch = req.body;

  if (req.body.hometeamU && 
      req.body.awayteamU && 
      req.body.stadiumnameU && 
      req.body.refereenameU && 
      req.body.dateU
      ) {
    UpcomingMatch.create(req.body).then((data) => res.json(data)).catch(next);
    const dbUpcomingMatch = new UpcomingMatch ({
      hometeamU: upcomingmatch.hometeamU,
      awayteamU: upcomingmatch.awayteamU,
      stadiumnameU: upcomingmatch.stadiumnameU,
      refereenameU: upcomingmatch.refereenameU,
      dateU: upcomingmatch.dateU,
    })
    dbUpcomingMatch.save()
    res.json({message: "Success"})
  }
  else {
    res.json({
      error: 'The input field is missing',
    });
  }
})
router.delete('/upcomingmatches/:id', (req, res, next) => {
  UpcomingMatch.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.route("/updateUpcomingMatch/:id").post(async function(req,res,next) {
  UpcomingMatch.findById(req.params.id, async function(err, upcomingmatch){
    if(!upcomingmatch) { return next(new Error("Unable to find upcoming match with this id"))}
    else {
      
      if(req.body.hometeamU != null){ upcomingmatch.hometeamU = req.body.hometeamU; }
      if(req.body.awayteamU != null){ upcomingmatch.awayteamU = req.body.awayteamU; }
      if(req.body.stadiumnameU != null){ upcomingmatch.stadiumnameU = req.body.stadiumnameU; }
      if(req.body.refereenameU != null){ upcomingmatch.refereenameU = req.body.refereenameU; }
      if(req.body.dateU != null){  upcomingmatch.dateU = req.body.dateU; }

      upcomingmatch.save().then(emp => {
        res.json({
          _id: upcomingmatch._id,
          hometeamU: upcomingmatch.hometeamU,
          awayteamU: upcomingmatch.awayteamU,
          stadiumnameU: upcomingmatch.stadiumnameU,
          refereenameU: upcomingmatch.refereenameU,
          dateU: upcomingmatch.dateU,

        });
      }).catch(err => {
        res.status(400).send("Unable to update upcoming match");
      });
    }
  });
});

module.exports = router;
