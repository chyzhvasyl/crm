const mongoose = require('mongoose');
require('./schems/action');
require('./schems/doctor');
require('./schems/patient');
require('./schems/session');



const Action = mongoose.model('action');
const Doctor = mongoose.model('doctor' );
const Patient = mongoose.model('patient' );
const Session = mongoose.model('session' );
const config = require ('./config/config');



