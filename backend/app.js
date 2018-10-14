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

// Port Number To Production
const port = process.env.PORT || 8080;

// const port = 3000;

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
// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static('../dist/app-grinnav'));

app.get('/*', (req,res)=>{

res.sendFile(path.join(__dirname,'../dist/app-grinnav/index.html'));

});

// Body Parser Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


// Passpot Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/user', userRoutes);
app.use('/api/documents', documentsRoutes);

app.get('/', (req, res) =>{
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port'+port);
});


module.exports = app;
