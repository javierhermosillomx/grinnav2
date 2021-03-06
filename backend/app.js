const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();
const userRoutes = require('./routes/user');
const documentsRoutes = require('./routes/documents');

mongoose.connect(config.database)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

// CORS Middleware
app.use(cors());

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('../dist/app-grinnav'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passpot Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use("/documents", express.static(path.join(__dirname, "documents")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use('/api/user', userRoutes);
app.use('/api/documents', documentsRoutes);;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
