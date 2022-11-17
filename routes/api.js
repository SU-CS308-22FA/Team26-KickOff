const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');
const isValidObjectId = require("../middleware/isValidObjectId");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")


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
      password: user.password
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
router.route("/updateUser/:id").post(function(req,res) {
  User.findById(req.params.id, function(err, user){
    if(!user) { return next(new Error("Unable to find user with this id"))}
    else {
      if(req.body.username != null){ user.username = req.body.username; }
      if(req.body.email != null){ user.email = req.body.email; }
      if(req.body.password != null){ user.password = req.body.password; }

      user.save().then(emp => {
        res.json("User Information updated successfully");
      }).catch(err => {
        res.status(400).send("Unable to update user");
      });
    }
  });
});
//login user
/*
router.post("/login", (req, res) => {
  var { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Add all data" });
  }
  User.findOne({ email: email })
    .then((foundUser) => {
      if (!foundUser) {
        return res
          .status(422)
          .json({ error: "User does not exists with that email" });
      } else {
        if (foundUser.password === password) {
          res.json({ message: "Loged in successfully" });
        } else {
          return res.status(422).json({ error: "Invalid email or password" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});*/
/*
router.post("/login",(req,res)=>{
  const {email,password} =req.body;
  User.findOne({email:email},(err,user)=>{
      if(user){
         if(password === user.password){
             res.send({message:"login sucess",user:user})
         }else{
             res.send({message:"wrong credentials"})
         }
      }else{
          res.send("not register")
      }
  })
});*/
/*
router.post("/login", (req,res) => {
  const userLoggingIn = req.body;

  User.findOne({username: userLoggingIn.username})
  .then(dbUser => {
    if(!dbUser){
      return res.json({message: "Invalid Username or password"})
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect => {
      if(isCorrect){
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86400},
          (err, token) => {
            if (err) return res.json({message: "err"})
            return res.json({
              message: "Success",
              token: "Bearer " + token
            })
          }
        )
      } else {
        return res.json({
          message: "Invalid Username or password"
        })
      }
    })
  })
})*/

const loginUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
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
module.exports = router;