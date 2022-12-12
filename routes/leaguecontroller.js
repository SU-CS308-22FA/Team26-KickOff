 const express = require('express');
const router = express.Router();
const League = require('../models/leaguedetails');
const asyncHandler = require("express-async-handler");



router.get('/leagues', asyncHandler(async(req, res) => {
    const leagues =  await League.find();
    res.send(leagues);
 }));

 router.post('/leagues', (req, res, next) => {
    const league = req.body;

    if (req.body.leaguename && 
        req.body.leagueyear && 
        req.body.leagueteam && 
        req.body.teamscore && 
        req.body.totalgoalsscored && 
        req.body.totalgoalsconceded && 
        req.body.matchesplayed && 
        req.body.matcheswon && 
        req.body.matcheslost && 
        req.body.matchestied && 
        req.body.averagegoals 
        ) {
      League.create(req.body).then((data) => res.json(data)).catch(next);
      res.json({message: "Success"})
    }
    else {
      res.json({
        error: 'The input field is missing',
      });
    }
})
router.delete('/leagues/:id', (req, res, next) => {
    League.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
});

router.route("/updateLeague/:id").post(async function(req,res,next) {
    League.findById(req.params.id, async function(err, league){
      if(!league) { return next(new Error("Unable to find league with this id"))}
      else {
        
        if(req.body.leaguename != null){ league.leaguename = req.body.leaguename; }
        if(req.body.leagueyear != null){ league.leagueyear = req.body.leagueyear; }
        if(req.body.leagueteam != null){ league.leagueteam = req.body.leagueteam; }
        if(req.body.teamscore != null){ league.teamscore = req.body.teamscore; }
        if(req.body.totalgoalsscored != null){ league.totalgoalsscored = req.body.totalgoalsscored; }
        if(req.body.totalgoalsconceded != null){ league.totalgoalsconceded = req.body.totalgoalsconceded; }
        if(req.body.matchesplayed != null){ league.matchesplayed = req.body.matchesplayed; }
        if(req.body.matcheswon != null){ league.matcheswon = req.body.matcheswon; }
        if(req.body.matcheslost != null){ league.matcheslost = req.body.matcheslost; }
        if(req.body.matchestied != null){ league.matchestied = req.body.matchestied; }
        if(req.body.averagegoals != null){ league.averagegoals = req.body.averagegoals; }

        league.save().then(emp => {
          res.json({
            _id: league._id,
            leaguename: league.leaguename,
            leagueyear: league.leagueyear,
            leagueteam: league.leagueteam,
            teamscore: league.teamscore,
            totalgoalsscored: league.totalgoalsscored,
            totalgoalsconceded: league.totalgoalsconceded,
            matchesplayed: league.matchesplayed,
            matcheswon: league.matcheswon,
            matcheslost: league.matcheslost,
            matchestied: league.matchestied,
            averagegoals: league.averagegoals,
          });
        }).catch(err => {
          res.status(400).send("Unable to update user");
        });
      }
    });
  });
module.exports = router;
