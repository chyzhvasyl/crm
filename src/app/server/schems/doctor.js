var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  id_doctor: { type: Schema.Types.ObjectId } ,
  full_name: { type: String },
  login: {type: String },
  password: { type: String },
  patient: [{ type: Schema.Types.ObjectId, ref: 'patient'}],

}, {versionKey: false});


const doctor = mongoose.model('doctor', DoctorSchema, 'doctor');
module.exports = doctor;
/*
later we needs to add a line for "photo"
*/
