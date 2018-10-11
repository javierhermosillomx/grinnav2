const express = require('express');
const multer = require("multer");

const Document = require('../models/document');
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
    cb(error, "backend/documents");
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
  multer({ storage: storage }).single("file"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const document = new Document({
      name: req.body.name,
      category: req.body.category,
      documentType: req.body.documentType,
      filePath: url + "/documents/" + req.file.filename,
      uploadDate: Date.now()
    });

    document.save().then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: {
          ...createdDocument,
          id: createdDocument._id
        }
      });
    });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const imageQuery = Document.find();
  let fetchedImages;
  if (pageSize && currentPage) {
    imageQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  imageQuery
    .then(documents => {
      fetchedImages = documents;
      return Document.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Document fetched successfully!",
        images: fetchedImages,
        maxImages: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Document.findById(req.params.id).then(document => {
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Document not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Document.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Document deleted!" });
  });
});

module.exports = router;
