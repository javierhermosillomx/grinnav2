const mongoose = require('mongoose');

const documentchema = mongoose.Schema({
  name:  { type: String, required: true },
  category:  { type: String, required: true },
  documentType:  { type: String, required: true },
  filePath:  { type: String, required: true },
  uploadDate:  { type: Date, required: true }
});

module.exports = mongoose.model('Document',documentchema);
