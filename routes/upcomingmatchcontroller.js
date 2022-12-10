const express = require('express');
const router = express.Router();
const upcomingMatch = require('../models/upcomingMatches');
const asyncHandler = require("express-async-handler");


router.get('/upcomingmatches', asyncHandler(async(req, res) => {
    const upcomingmatches = await upcomingMatch.find();
    res.send(upcomingmatches);
 }));

 router.post('/upcomingmatches', (req, res, next) => {
    const upcomingmatch = req.body;

    if (req.body.hometeamU 
        && req.body.awayteamU 
        && req.body.stadiumnameU 
        && req.body.refereenameU 
        && req.body.dateU 
        ) {
      upcomingMatch.create(req.body).then((data) => res.json(data)).catch(next);
      const dbUpcomingMatch = new Match ({
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
    upcomingMatch.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
});

router.route("/updateUpcomingMatch/:id").post(async function(req,res,next) {
    Match.findById(req.params.id, async function(err, upcomingmatch){
      if(!upcomingmatch) { return next(new Error("Unable to find upcoming match with this id"))}
      else {
        
        if(req.body.hometeamU != null){ match.hometeamU = req.body.hometeamU; }
        if(req.body.awayteamU != null){ match.awayteamU = req.body.awayteamU; }
        if(req.body.stadiumnameU != null){ match.stadiumnameU = req.body.stadiumnameU; }
        if(req.body.refereenameU != null){ match.refereenameU = req.body.refereenameU; }
        if(req.body.dateU != null){ match.dateU = req.body.dateU; }

        upcomingmatch.save().then(emp => {
          res.json({
            _id: match._id,
            hometeamU: match.hometeamU,
            awayteamU: match.awayteamU,
            stadiumnameU: match.stadiumnameU,
            refereenameU: match.refereenameU,
            dateU: match.dateU,
          });
        }).catch(err => {
          res.status(400).send("Unable to update upcoming match");
        });
      }
    });
  });
module.exports = router;
