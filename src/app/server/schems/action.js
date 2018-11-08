var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  id_action: { type: ObjectId },
  id_patient: {  type: Schema.Types.ObjectId, ref: 'patient'},
  date: { type: String },
  type: { type: String },
  diagnosis: { type: String },
  description: { type: String },

});

const action = mongoose.model('action', ActionSchema);
module.exports = action;
