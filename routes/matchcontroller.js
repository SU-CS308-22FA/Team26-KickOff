const express = require('express');
const router = express.Router();
const Match = require('../models/matchdetails');
const asyncHandler = require("express-async-handler");


router.get('/matches', asyncHandler(async(req, res) => {
    const matches = await Match.find();
    res.send(matches);
 }));
 router.get(
  "/matches/:id",
  asyncHandler(async (req,res) => {
    const match = await Match.findById(req.params.id);
    res.send(match);
  })
 );
 const commentMatch = async (req,res) => {
   const { id } = req.params;
   const { value } = req.body;

   const match = await Match.findById(id);

   match.comments.push(value);

   const updatedMatch = await Match.findByIdAndUpdate(id, match, {new:true});

   res.json(updatedMatch);
 }
 router.post('/:id/commentMatch', commentMatch);

 router.post('/matches', (req, res, next) => {
    const match = req.body;

    if (req.body.hometeam 
        && req.body.awayteam 
        && req.body.stadiumname 
        && req.body.refereename 
        && req.body.date 
        && req.body.firsthalfscoreHome 
        && req.body.firsthalfscoreAway 
        && req.body.secondhalfscoreHome 
        && req.body.secondhalfscoreAway 
        && req.body.ballpossesionHome 
        && req.body.ballpossesionAway
        && req.body.totalshotsHome 
        && req.body.totalshotsAway 
        && req.body.shotsonbarHome 
        && req.body.shotsonbarAway
        && req.body.shotsontargetHome 
        && req.body.shotsontargetAway 
        && req.body.cornerkicksHome 
        && req.body.cornerkicksAway
        && req.body.offsidesHome 
        && req.body.offsidesAway 
        && req.body.foulsHome 
        && req.body.foulsAway
        && req.body.yellowcardsHome 
        && req.body.yellowcardsAway 
        && req.body.redcardsHome 
        && req.body.redcardsAway
        && req.body.goalsavesHome 
        && req.body.goalsavesAway 
        && req.body.passesHome 
        && req.body.passesAway
        && req.body.accpassesHome 
        && req.body.accpassesAway 
        ) {
      Match.create(req.body).then((data) => res.json(data)).catch(next);
      const dbMatch = new Match ({
        hometeam: match.hometeam,
        awayteam: match.awayteam,
        stadiumname: match.stadiumname,
        refereename: match.refereename,
        date: match.date,
        firsthalfscoreHome: match.firsthalfscoreHome,
        firsthalfscoreAway: match.firsthalfscoreAway,
        secondhalfscoreHome: match.secondhalfscoreHome,
        secondhalfscoreAway: match.secondhalfscoreAway,
        ballpossesionHome: match.ballpossesionHome,
        ballpossesionAway: match.ballpossesionAway,
        totalshotsHome: match.totalshotsHome,
        totalshotsAway: match.totalshotsAway,
        shotsonbarHome: match.shotsonbarHome,
        shotsonbarAway: match.shotsonbarAway,
        shotsontargetHome: match.shotsontargetHome,
        shotsontargetAway: match.shotsontargetAway,
        cornerkicksHome: match.cornerkicksHome,
        cornerkicksAway: match.cornerkicksAway,
        offsidesHome: match.offsidesHome,
        offsidesAway: match.offsidesAway,
        foulsHome: match.foulsHome,
        foulsAway: match.foulsAway,
        yellowcardsHome: match.yellowcardsHome,
        yellowcardsAway: match.yellowcardsAway,
        redcardsHome: match.redcardsHome,
        redcardsAway: match.redcardsAway,
        goalsavesHome: match.goalsavesHome,
        goalsavesAway: match.goalsavesAway,
        passesHome: match.passesHome,
        passesAway: match.passesAway,
        accpassesHome: match.accpassesHome,
        accpassesAway: match.accpassesAway,
      })
      dbMatch.save()
      res.json({message: "Success"})
    }
    else {
      res.json({
        error: 'The input field is missing',
      });
    }
})
router.delete('/matches/:id', (req, res, next) => {
    Match.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
});

router.route("/updateMatch/:id").post(async function(req,res,next) {
    Match.findById(req.params.id, async function(err, match){
      if(!match) { return next(new Error("Unable to find match with this id"))}
      else {
        
        if(req.body.hometeam != null){ match.hometeam = req.body.hometeam; }
        if(req.body.awayteam != null){ match.awayteam = req.body.awayteam; }
        if(req.body.stadiumname != null){ match.stadiumname = req.body.stadiumname; }
        if(req.body.refereename != null){ match.refereename = req.body.refereename; }
        if(req.body.date != null){ match.date = req.body.date; }
        if(req.body.firsthalfscoreHome != null){ match.firsthalfscoreHome = req.body.firsthalfscoreHome; }
        if(req.body.firsthalfscoreAway != null){ match.firsthalfscoreAway = req.body.firsthalfscoreAway; }
        if(req.body.secondhalfscoreHome != null){ match.secondhalfscoreHome = req.body.secondhalfscoreHome; }
        if(req.body.secondhalfscoreAway != null){ match.secondhalfscoreAway = req.body.secondhalfscoreAway; }
        if(req.body.ballpossesionHome != null){ match.ballpossesionHome = req.body.ballpossesionHome; }
        if(req.body.ballpossesionAway != null){ match.ballpossesionAway = req.body.ballpossesionAway; }
        if(req.body.totalshotsHome != null){ match.totalshotsHome = req.body.totalshotsHome; }
        if(req.body.totalshotsAway != null){ match.totalshotsAway = req.body.totalshotsAway; }
        if(req.body.shotsonbarHome != null){ match.shotsonbarHome = req.body.shotsonbarHome; }
        if(req.body.shotsonbarAway != null){ match.shotsonbarAway = req.body.shotsonbarAway; }
        if(req.body.shotsontargetHome != null){ match.shotsontargetHome = req.body.shotsontargetHome; }
        if(req.body.shotsontargetAway != null){ match.shotsontargetAway = req.body.shotsontargetAway; }
        if(req.body.cornerkicksHome != null){ match.cornerkicksHome = req.body.cornerkicksHome; }
        if(req.body.cornerkicksAway != null){ match.cornerkicksAway = req.body.cornerkicksAway; }
        if(req.body.offsidesHome != null){ match.offsidesHome = req.body.offsidesHome; }
        if(req.body.offsidesAway != null){ match.offsidesAway = req.body.offsidesAway; }
        if(req.body.foulsHome != null){ match.foulsHome = req.body.foulsHome; }
        if(req.body.foulsAway != null){ match.foulsAway = req.body.foulsAway; }
        if(req.body.yellowcardsHome != null){ match.yellowcardsHome = req.body.yellowcardsHome; }
        if(req.body.yellowcardsAway != null){ match.yellowcardsAway = req.body.yellowcardsAway; }
        if(req.body.redcardsHome != null){ match.redcardsHome = req.body.redcardsHome; }
        if(req.body.redcardsAway != null){ match.redcardsAway = req.body.redcardsAway; }
        if(req.body.goalsavesHome != null){ match.goalsavesHome = req.body.goalsavesHome; }
        if(req.body.goalsavesAway != null){ match.goalsavesAway = req.body.goalsavesAway; }
        if(req.body.passesHome != null){ match.passesHome = req.body.passesHome; }
        if(req.body.passesAway != null){ match.passesAway = req.body.passesAway; }
        if(req.body.accpassesHome != null){ match.accpassesHome = req.body.accpassesHome; }
        if(req.body.accpassesAway != null){ match.accpassesAway = req.body.accpassesAway; }

        match.save().then(emp => {
          res.json({
            _id: match._id,
            hometeam: match.hometeam,
            awayteam: match.awayteam,
            stadiumname: match.stadiumname,
            refereename: match.refereename,
            date: match.date,
            firsthalfscoreHome: match.firsthalfscoreHome,
            firsthalfscoreAway: match.firsthalfscoreAway,
            secondhalfscoreHome: match.secondhalfscoreHome,
            secondhalfscoreAway: match.secondhalfscoreAway,
            ballpossesionHome: match.ballpossesionHome,
            ballpossesionAway: match.ballpossesionAway,
            totalshotsHome: match.totalshotsHome,
            totalshotsAway: match.totalshotsAway,
            shotsonbarHome: match.shotsonbarHome,
            shotsonbarAway: match.shotsonbarAway,
            shotsontargetHome: match.shotsontargetHome,
            shotsontargetAway: match.shotsontargetAway,
            cornerkicksHome: match.cornerkicksHome,
            cornerkicksAway: match.cornerkicksAway,
            offsidesHome: match.offsidesHome,
            offsidesAway: match.offsidesAway,
            foulsHome: match.foulsHome,
            foulsAway: match.foulsAway,
            yellowcardsHome: match.yellowcardsHome,
            yellowcardsAway: match.yellowcardsAway,
            redcardsHome: match.redcardsHome,
            redcardsAway: match.redcardsAway,
            goalsavesHome: match.goalsavesHome,
            goalsavesAway: match.goalsavesAway,
            passesHome: match.passesHome,
            passesAway: match.passesAway,
            accpassesHome: match.accpassesHome,
            accpassesAway: match.accpassesAway,
          });
        }).catch(err => {
          res.status(400).send("Unable to update match");
        });
      }
    });
  });
module.exports = router;
