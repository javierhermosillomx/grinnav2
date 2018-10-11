const express = require('express');
const multer = require("multer");

const Imagen = require('../models/imagen');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});




router.post(
  "",
  multer({ storage: storage }).single("url"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const image = new Imagen({
      name: req.body.name,
      createdDate: req.body.createdDate,
      url: url + "/images/" + req.file.filename
    });

    image.save().then(createdImage => {
      res.status(201).json({
        message: 'Image added successfully',
        image: {
          ...createdImage,
          id: createdImage._id
        }

      });
    });

});

// router.get("",checkAuth, (req, res, next) =>{

//   Imagen.find()
//     .then(documents => {
//       res.status(200).json({
//         message: 'Images fetched succesfully !',
//         images: documents
//       })
//     });
// });

// router.delete("/:id", (req, res, next) => {
//   Imagen.deleteOne({ _id: req.params.id }).then ( result => {
//     console.log(result);
//     res.status(200).json({message: 'Image deleted!'});
//   });

// });

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const imageQuery = Imagen.find();
  let fetchedImages;
  if (pageSize && currentPage) {
    imageQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  imageQuery
    .then(documents => {
      fetchedImages = documents;
      return Image.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Image fetched successfully!",
        images: fetchedImages,
        maxImages: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Imagen.findById(req.params.id).then(image => {
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: "image not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Imagen.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "image deleted!" });
  });
});

module.exports = router;
