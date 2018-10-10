const express = require('express');
const Imagen = require('../models/imagen');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get("",checkAuth, (req, res, next) =>{

  Imagen.find()
    .then(documents => {
      res.status(200).json({
        message: 'Images fetched succesfully !',
        images: documents
      })
    });
});

router.post("", checkAuth, (req, res) => {
  const image = new Imagen({
    name: req.body.name,
    createdDate: req.body.createdDate,
    url: req.body.url
  });

    image.save().then(createdImage => {
      res.status(201).json({
        message: 'Image added successfully',
        imageId: createdImage._id
      });
    });

});

router.delete("/:id", (req, res, next) => {
  Imagen.deleteOne({ _id: req.params.id }).then ( result => {
    console.log(result);
    res.status(200).json({message: 'Image deleted!'});
  });

});

module.exports = router;
