const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  fileType: {
    type: String
  },
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  timeOfCreation: {
    type: Date,
    default: Date.now()
  },
  graphic: { type: Schema.Types.ObjectId, ref: 'graphic' },

}, {versionKey: false});

const file = mongoose.model('file_graphic', fileSchema, 'file_graphic');
module.exports = file;
