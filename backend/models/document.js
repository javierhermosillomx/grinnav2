const mongoose = require('mongoose');

const documentchema = mongoose.Schema({
  name:  { type: String, required: true },
  category:  { type: String, required: true },
  documentType:  { type: String, required: true },
  nameDataBase:  { type: String, required: true },
  filePath:  { type: String, required: true },
  createdBy:  { type: String, required: true },
  createdDate:  { type: Date, required: true },
  updatedBy:  { type: String, required: false },
  updatedDate:  { type: Date, required: false }
});

module.exports = mongoose.model('Document',documentchema);
