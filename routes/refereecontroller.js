const express = require('express');
const router = express.Router();
const Referee = require('../models/referee');
const asyncHandler = require("express-async-handler");
const isValidObjectId = require("../middleware/isValidObjectId");


// Get players
router.get("/referees", asyncHandler(async (req, res) => {
    const referee = await Referee.find();
    res.send(referee);
}));

//get player by id
router.get(
    "/referees/:id",
    isValidObjectId,
    asyncHandler(async (req, res) => {
        const referee = await Referee.findById(req.params.id);
        res.send(referee);
    })
);

// post player
router.post('/referee', (req, res, next) => {
    if (req.body.rname && req.body.class && req.body.region && req.body.r_image && req.body.matches) {
        Referee.create(req.body).then((data) => res.json(data)).catch(next);
    }
    else {
        res.json({
            error: 'The input field is missing',
        });
    }
})
// delete player
router.delete('/referee/:id', (req, res, next) => {
    Referee.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
})

//update player
router.route("/updateReferee/:id").post(async function (req, res, next) {
    Referee.findById(req.params.id, async function (err, referee) {
        if (!referee) { return next(new Error("Unable to find player with this id")) }
        else {

            if (req.body.rname != null) { referee.rname = req.body.rname; }
            if (req.body.class != null) { referee.class = req.body.class; }
            if (req.body.region != null) { referee.region = req.body.region; }
            if (req.body.matches != null) { referee.matches = req.body.matches; }
            if (req.body.r_image != null) { referee.r_image = req.body.r_image; }

            player.save().then(emp => {
                res.json({
                    _id: referee._id,
                    rname: referee.rname,
                    class: referee.class,
                    region: referee.region,
                    matches: referee.matches,
                    r_image: referee.r_image,
                });
            }).catch(err => {
                res.status(400).send("Unable to update player");
            });
        }
    });
});
module.exports = router;