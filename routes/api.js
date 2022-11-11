const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');
const asyncHandler = require("../middleware/asyncHandler");
const isValidObjectId = require("../middleware/isValidObjectId");


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
});

module.exports = router;