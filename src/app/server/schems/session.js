var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('debug', true);

const SessionSchema = new Schema({
  // id_patient: { type: Number },
  // id_doctor: { type: Number },
  // _id: { type: Schema.Types.ObjectId },
  hand: { type: Number },
  training_type: [ { type: Number }],
  started_time: { type: Number},
  value: [ { _id : false , b1: { type: Number }, b2: { type: Number }, b3: { type: Number }, b4: { type: Number }, b5: { type: Number }, oX: { type: Number }, oY: { type: Number }, oZ: { type: Number }}],
  patient: {type: Schema.Types.ObjectId, ref: 'patient'},
  file: {type: Schema.Types.ObjectId, ref: 'file_graphic'},

}, {versionKey: false});

const graphic = mongoose.model('graphic', SessionSchema,'graphic');
module.exports = graphic;
