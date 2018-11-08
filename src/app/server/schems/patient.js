var mongoose = require('mongoose');

const Schema = mongoose.Schema;
/*
const PatientSchema = new Schema({
  id_patient : {type: Schema.Types.ObjectId} ,
  id_doctor : {type: Schema.Types.ObjectId , ref: 'doctor' } ,
  fullname     : { type: String },
  birthdate: { type: Date },
  status: { type: String },
  sex: { type: String },
  description: { type: String },

});
*/

const PatientSchema = new Schema({
  id_patient : {type: Schema.Types.ObjectId} ,
  fullname     : { type: String },
  birthdate: { type: String },
  status: { type: String },
  date_in: {type: String},
  date_out: {type: String},
  desease: {type: String},
  sex: { type: String },
  description: { type: String },
  doctor : [{type: Schema.Types.ObjectId , ref: 'doctor' }],
  graphic: [{type: Schema.Types.ObjectId, ref: 'graphic'}],

}, {versionKey: false});
const patient = mongoose.model('patient', PatientSchema,'patient' );
module.exports = patient;

/*
later we needs to add a line for "photo"
*/
