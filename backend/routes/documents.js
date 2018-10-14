const express = require('express');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Document = require('../models/document');
const checkAuth = require('../middleware/check-auth');
const passport = require('passport');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/documents");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, name);
  }
});

router.post(
  "",
  multer({
    storage: storage
  }).single("file"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const document = new Document({
      name: req.body.name,
      category: req.body.category,
      documentType: req.body.documentType,
      nameDataBase: req.body.nameDataBase,
      filePath: url + req.body.filePath + req.nameDataBase,
      createdBy: req.body.createdBy,
      createdDate: Date.now()
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
  const documentType = req.query.type;
  const documentCategory = req.query.category;
  const documentQuery = Document.find({category: documentCategory, documentType: documentType});
  let fetchedDocuments;
  documentQuery
    .then(documents => {
      fetchedDocuments = documents;
    })
    .then(count => {
      res.status(200).json({
        message: "Document fetched successfully!",
        documents: fetchedDocuments
      });
    });
});

router.get("/:id", (req, res, next) => {
  Document.findById(req.params.id).then(document => {
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({
        message: "Document not found!"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Document.findById(req.params.id).then(document => {
    if (document) {
      Document.deleteOne({
        _id: document._id
      }).then(result => {
        fs.exists('backend/documents/' + document.nameDataBase.toLowerCase().split(" ").join("-"), function (exists) {
          if (exists) {
            //Show in green
            console.log('File exists. Deleting now ...');
            fs.unlink('backend/documents/' + document.nameDataBase.toLowerCase().split(" ").join("-"));
          } else {
            //Show in red
            console.log('+++++++++ File not found, so not deleting. ' + document.nameDataBase.toLowerCase().split(" ").join("-"));
          }
        });
        res.status(200).json({
          message: "Documento borrado!"
        });
      });

    } else {
      res.status(404).json({
        message: "Document not found!"
      });
    }
  });
});

router.post('/downloadDocument', function (req, res) {
  filepath = path.join(__dirname, '../documents') + '/' + req.body.filename;
  res.sendFile(filepath);
});

module.exports = router;
