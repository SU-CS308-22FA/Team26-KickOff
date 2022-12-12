const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const matchroutes = require("./routes/matchcontroller");
const leagueroutes = require("./routes/leaguecontroller");
const refereeroutes = require("./routes/refereecontroller");


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
// Connect to the database
mongoose
  .connect("mongodb+srv://user:kickoff@cluster0.nytlmne.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/matchcontroller', matchroutes);
app.use('/leaguecontroller', leagueroutes);
app.use('/refereecontroller', refereeroutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});