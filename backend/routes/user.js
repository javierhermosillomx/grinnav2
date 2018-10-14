const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const config = require('../config/database');

router.post("/signup", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: null,
    role: req.body.role
  });

  User.existUser(newUser.email, (err,isExistUser)=> {
    if(!isExistUser){
      User.addUser(newUser, ( err, user) =>{
          if(err){
            res.json({success: false, msg:'Error al registrar usuario'});
          } else {
              res.json({success:true, msg:'Usuario registrado'});
          }
      });
    } else {
        res.json({success:false, msg:'Ya existe un usuario registrado con este correo electrónico'});
    }
});
});

// Authenticate
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, function(err, user){
      if(err) throw err;

      if(!user){
          return res.json({success: false, msg:'Usuario no encontrado'});
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
          if(err) throw err;
          if(isMatch){
           let expiresTime = 3600;
              const token = jwt.sign({data: user}, config.secret, {
                  expiresIn: expiresTime
                 });
              res.json({
                  success: true,
                  token: 'Bearer ' + token,
                  expiresIn: expiresTime,
                  user:{
                      id: user._id,
                      username: user.name,
                      email: user.email,
                      role: user.role
                  }
              });
          } else {
              return res.json({success: false, msg:'Contraseña incorrecta'});
          }

      });
  });
});

// router.post("/login", (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         "karola_la_vaca_patinadora",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600
//       });
//     })
//     .catch(err => {
//       return res.status(401).json({
//         message: "Auth failed"
//       });
//     });
// });



module.exports = router;
