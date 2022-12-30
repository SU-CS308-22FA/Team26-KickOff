const express = require('express');
const router = express.Router();
const Stadiums = require('../models/stadiums');
const asyncHandler = require("express-async-handler");


router.get('/stadiums', asyncHandler(async(req, res) => {
    const dispStadiums = await Stadiums.find();
    res.send(dispStadiums);
 }));

 router.post('/stadiums', (req, res, next) => {
    const dispStadiums = req.body;

    if (req.body.stadium_teamname
        && req.body.stadium_photo
        ) {
      Stadiums.create(req.body).then((data) => res.json(data)).catch(next);
      res.json({message: "Success"})
    }
    else {
      res.json({
        error: 'The input field is missing',
      });
    }
})

router.delete('/stadiums/:id', (req, res, next) => {
    Stadiums.findOneAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
});

router.route("/updateStadium/:id").post(async function(req,res,next) {
    Stadiums.findById(req.params.id, async function(err, dispStadiums){
      if(!dispStadiums) { return next(new Error("Unable to find stadium new with this id"))}
      else {
        
        if(req.body.stadium_teamname != null){ dispStadiums.stadium_teamname = req.body.stadium_teamname; }
        if(req.body.stadium_photo != null){ dispStadiums.stadium_photo = req.body.stadium_photo; }

        dispStadiums.save().then(emp => {
          res.json({
            _id: dispStadiums._id,
            stadium_teamname: dispStadiums.stadium_teamname,
            stadium_photo: dispStadiums.stadium_photo,
          });
        }).catch(err => {
          res.status(400).send("Unable to update new");
        });
      }
    });
  });
module.exports = router;
