// loads the native path module
const path = require("path");

// loads expressjs module
const express = require("express");

// adding the cors module
var cors = require('cors')

// Load BodyParser 
const bodyParser = require('body-parser');

// Instantiates the app
const app = express();

// using the cors module
app.use(cors())

// Body parser
app.use(bodyParser.urlencoded({extended: false}));

// stores the public directory path
const publicDir = path.join(__dirname, '../../public');


//load db
 const db = require('./config/database');

// //connect with sequelize
 db
   .authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch(err => {
     console.error('Unable to connect to the database:', err);
  });

//MMO routes
app.use('/mmo', require('./routes/mmodb')); 

// setting the public directory as a public static folder
app.use(express.static("public"));

console.log(publicDir)

app.get("/", (req, res) => {
    res.sendFile( path.join(__dirname, "/../public/index.html") )
})


app.get("/game", (req, res) => {
    res.sendFile( path.join(__dirname, "../public/game.html") )
})




// exports the app instance
module.exports = app;