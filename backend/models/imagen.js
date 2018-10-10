const mongoose = require('mongoose');

const imagenSchema = mongoose.Schema({
  name:  { type: String, required: true },
  createdDate:  { type: String, required: true },
  url:  { type: String, required: true }

});

module.exports = mongoose.model('Imagen',imagenSchema);

