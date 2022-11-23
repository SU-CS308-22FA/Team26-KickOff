const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');
const isValidObjectId = require("../middleware/isValidObjectId");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const expressFormidable = require("express-formidable")
const Team = require('../models/team');
const Player = require('../models/player');



const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn:'7d',
  });
};

router.get('/todos', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});
// Get users
router.get("/users", asyncHandler(async (req,res) => {
  const users = await User.find();
  res.send(users);
 }));
 //get user by id
router.get(
  "/users/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  })
 );
router.post('/todos', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});
// register user
router.post("/register", async (req,res) => {
  const user = req.body;
  
  // check if username or email has been taken by another user
  const takenUsername = await User.findOne({username: user.username})
  const takenEmail = await User.findOne({email: user.email})

  if(takenUsername || takenEmail){
    res.json({message: "Username or email has already been taken"})
  } else {
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
      image: "",
      supportedTeam: "",
    })
    dbUser.save()
    res.json({message: "Success"})
  }
})
// post user
router.post('/user', (req, res, next) => {
  if (req.body.username && req.body.email && req.body.password) {
    User.create(req.body).then((data) => res.json(data)).catch(next);
  }
  else {
    res.json({
      error: 'The input field is missing',
    });
  }
})
router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});
// delete user
router.delete('/user/:id', (req, res, next) => {
  User.findOneAndDelete({_id: req.params.id})
  .then((data) => res.json(data))
  .catch(next);
})
function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if (token) {
      jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
          if (err) return res.json({isLoggedIn: false, message: "Failed To Authenticate"})
          req.user = {};
          req.user.id = decoded.id
          req.user.username = decoded.username
          next()
      })
  } else {
      res.json({message: "Incorrect Token Given", isLoggedIn: false})
  }
}

router.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json({isLoggedIn: true, username: req.user.username})
})
//update user
router.route("/updateUser/:id").post(async function(req,res,next) {
  User.findById(req.params.id, async function(err, user){
    if(!user) { return next(new Error("Unable to find user with this id"))}
    else {
      
      if(req.body.username != null){ user.username = req.body.username; }
      if(req.body.email != null){ user.email = req.body.email; }
      if(req.body.image != null){ user.image = req.body.image; }
      if(req.body.supportedTeam != null){ user.supportedTeam = req.body.supportedTeam; }
      if(req.body.password != null){ user.password = await bcrypt.hash(req.body.password, 10) }

      user.save().then(emp => {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          supportedTeam: user.supportedTeam,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      }).catch(err => {
        res.status(400).send("Unable to update user");
      });
    }
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			username: user.username,
      email: user.email,
      image: user.image,
      supportedTeam: user.supportedTeam,
      isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});
router.post("/login", loginUser);
router.get("/getUsername", verifyJWT, (req,res) => {
  res.json({isLoggedIn: true, username: req.user.username})
})




//Team apis

// Get teams
router.get("/teams", asyncHandler(async (req,res) => {
  const teams = await Team.find();
  res.send(teams);
 }));
 //get team by id
router.get(
  "/teams/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    res.send(team);
  })
 );
 // post team
router.post('/team', (req, res, next) => {
  if (req.body.teamname && req.body.director && req.body.st_name && req.body.logo) {
    Team.create(req.body).then((data) => res.json(data)).catch(next);
  }
  else {
    res.json({
      error: 'The input field is missing',
    });
  }
})
// delete team
router.delete('/team/:id', (req, res, next) => {
  Team.findOneAndDelete({_id: req.params.id})
  .then((data) => res.json(data))
  .catch(next);
})
//update team
router.route("/updateTeam/:id").post(async function(req,res,next) {
  Team.findById(req.params.id, async function(err, team){
    if(!team) { return next(new Error("Unable to find team with this id"))}
    else {
      
      if(req.body.teamname != null){ team.teamname = req.body.teamname; }
      if(req.body.director != null){ team.director = req.body.director; }
      if(req.body.st_name != null){ team.st_name = req.body.st_name; }
      if(req.body.logo != null){ team.logo = req.body.logo; }
      
      team.save().then(emp => {
        res.json({
          _id: team._id,
          teamname: team.teamname,
          director: team.director,
          st_name: team.st_name,
          logo: team.logo,
        });
      }).catch(err => {
        res.status(400).send("Unable to update team");
      });
    }
  });
});


//player apis

// Get players
router.get("/players", asyncHandler(async (req,res) => {
  const players = await Player.find();
  res.send(players);
 }));

 //get player by id
router.get(
  "/players/:id",
  isValidObjectId,
  asyncHandler(async (req,res) => {
    const player = await Player.findById(req.params.id);
    res.send(player);
  })
 );

 // post player
router.post('/player', (req, res, next) => {
  if (req.body.teamname && req.body.p_num && req.body.p_name && req.body.p_pos && req.body.p_image) {
    Player.create(req.body).then((data) => res.json(data)).catch(next);
  }
  else {
    res.json({
      error: 'The input field is missing',
    });
  }
})
// delete player
router.delete('/player/:id', (req, res, next) => {
  Player.findOneAndDelete({_id: req.params.id})
  .then((data) => res.json(data))
  .catch(next);
})

router.get(
  ""
);

//update player
router.route("/updatePlayer/:id").post(async function(req,res,next) {
  Player.findById(req.params.id, async function(err, player){
    if(!player) { return next(new Error("Unable to find player with this id"))}
    else {
      
      if(req.body.teamname != null){ player.teamname = req.body.teamname; }
      if(req.body.p_num != null){ player.p_num = req.body.p_num; }
      if(req.body.p_name != null){ player.p_name = req.body.p_name; }
      if(req.body.p_pos != null){ player.p_pos = req.body.p_pos; }
      if(req.body.p_image != null){ player.p_image = req.body.p_image; }
      
      player.save().then(emp => {
        res.json({
          _id: player._id,
          teamname: player.teamname,
          p_num: player.p_num,
          p_name: player.p_name,
          p_pos: player.p_pos,
          p_image: player.p_image,
        });
      }).catch(err => {
        res.status(400).send("Unable to update player");
      });
    }
  });
});

module.exports = router;