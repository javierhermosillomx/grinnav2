const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
  email:  { type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String, required: true},
  role: { type: String, required: true}

});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id,callback);
}

module.exports.getUserByEmail = function(email, callback) {
  const query ={email: email}
  User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      if(err) throw err;
      newUser.password = hash;
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  })
}

module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, function (err, isMatch){
      if(err) throw err;
      callback(null, isMatch);
  });
}

module.exports.existUser = function(email, callback) {
  const query ={email: email}
  User.findOne(query, function(err, user){
      if(err) {
        console.log(err);
      }
      let msg = '';
      if(user) {
          msg = "El usuario existe";
          callback(null, true);
      } else {
          console.log(user);
          msg= "El usuario no existe";
          callback(null, false);
      }
  });
}
