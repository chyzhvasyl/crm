let express = require('express');
let intel = require('intel');
const jwt = require('jsonwebtoken');
let router = express.Router();
let patient = require('../schems/patient');
let graphic = require('../schems/session');
let doctor = require('../schems/doctor');
const file = require('../schems/file');
let moment = require('moment');
let fs = require('fs');
let multer = require('multer');
const path = require('path');
const UPLOAD_PATH = './uploads';
const UPLOAD_PATH_VIDEOS = UPLOAD_PATH + '/videos';
//var randtoken = require('rand-token');



/* api routes */
router.put('/update_patient/:id', updatePatient);
router.delete('/delete_patient', deletePatient);
router.post('/session/:id', findGraphic);
router.post('/addpatient/:id', addPatient);
router.get('/doctor', allDoctors);
router.post('/login', signin);
router.post('/patient_upload/:id', patient_upload);

let login_time;
let active_time;

// verify Token
function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {

      return res.status(401).send('Unauthorized request!!!!!')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('No token')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(401).send('Invalid token')
    }
    req._id = payload.subject;
    next()
  }
  catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      login_time=+ 40*40;
      return res.status(401).send('token expired');
    }
  }
}

// login
function signin(req, res) {

  //console.log('начало визова функции signin ___________________');
  let userData = req.body;
  //console.log('Значение логина:' + userData.email);
  //console.log('Значение пароля:' + userData.password);
  doctor.findOne({login: userData.email}, (err, user) => {
    if (err) {
      //console.log('ошибка!' + err);
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let ttl = Math.floor(Date.now() / 1000);
        login_time =+40*40;
        let payload = {exp: ttl + login_time, subject: user._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token, _id: user._id});
      }
    }
  })
}


// add patient
function addPatient(req, res) {
  //let now = moment().format('DD-MM-YYYY');

  if(req.body.date_in || req.body.date_out){

    // req.body.date_in = moment(req.body.date_in, 'DD-MM-YYYY').format('dddd DD MMMM YYYY');
    // req.body.date_out = moment(req.body.date_out, 'DD-MM-YYYY').format('dddd DD MMMM YYYY');
  }
  let userData = req.body;
  userData.doctor = req.params.id;
  let user = new patient(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      doctor.findById(req.params.id).exec(function (err, doctor) {
        if (err) {
          res.json(err);
          intel.error(err);
        } else {
          doctor.patient.push(user._id);
          doctor.save(doctor);
          let ttl = Math.floor(Date.now() / 1000);
          active_time =+40*40;
          let payload = {exp: ttl + active_time, subject: registeredUser._id};
          let token = jwt.sign(payload, 'secretKey');
          registeredUser.birthdate = moment().diff(moment(req.body.birthdate, "DD-MM-YYYY"), 'years', false);
          res.status(200).send({token, registeredUser});
        }
      });
    }
  })
}

// Update patient in cabinet
function updatePatient(req, res) {
  patient.findById(req.params.id)
    .exec(function (err, patient) {
      if (err) {
        res.json(err);
        intel.error(err);
      } else {
        if (req.body.fullname) {
          patient.fullname = req.body.fullname;
        }
        if (req.body.desease) {
          patient.desease = req.body.desease;
        }
        if (req.body.date_in) {
          patient.date_in = req.body.date_in;
        }
        if (req.body.date_out) {
          patient.date_out = req.body.date_out;
        }
        if (req.body.status) {
          patient.status = req.body.status;
        }
        if (req.body.birthdate) {
          patient.birthdate = req.body.birthdate;
        }
        if (req.body.sex) {
          patient.sex = req.body.sex;
        }
        if (req.body.description) {
          patient.description = req.body.description;
        }
        patient.save(patient);
        res.status(200).send(patient);
        intel.info('Patient edited', patient);
      }
    });
}




router.get('/patient/:id', verifyToken, (req, res) => {
  patient.findById(req.params.id)
    .exec(function (err, patient) {
      if (err) {
        res.json(err);
        intel.error(err);
      } else {
        //patient.birthdate = moment().diff(moment(patient.birthdate, "DD-MM-YYYY"), 'years', false);
        res.json(patient);
        intel.info('Got single patient by id ', patient);
      }
    });
});

//  own cabinet
router.get('/personal/:id', verifyToken, (req, res) => {
  doctor.findById(req.params.id)
    .populate('patient')
    .lean()
    .exec(function (err, patient) {
      if (err) {
        res.json(err);
        intel.error(err);
      } else {
        let patients = [];
        for (let i = 0; i < patient.patient.length; i++) {
          patient.patient[i].birthdate = moment().diff(moment(patient.patient[i].birthdate, "DD-MM-YYYY"), 'years', false);
          patients.push(patient.patient[i]);
        }
        res.json(patients);
        intel.info('Got single patient by id ', patients);
      }

    });

});
/*  delete patient  by one id throught url - работающій мєтод */
//function deletePatient(req, res) {
//  Patient.findByIdAndDelete(req.params.id, function(err, patient) {
//    if(err) {
//      res.json(err);
//    } else {
//      res.json(patient);
//      intel.info('Patient deleted ', patient);
//    }
//  });
//}
//

/*  delete patient  */
function deletePatient(req, res) {
  let id_data = req.body;
  res.json(id_data);
  for (let i = 0; i < id_data.length; i++) {
    patient.deleteOne({_id: id_data[i]._id}, function (err) {
      if (err) {
        res.json(err);
        return intel.error(err);
      }
    });
  }
}

// get session graphic
function findGraphic(req, res) {
  //let a =  mongoose.Types.ObjectId(req.params.id);
 // console.log('aaaaaaaaaaaaaaa', a) ;
  //let b = new Date(parse);
//let ms_time = moment.unix(1539687129);
//let next_time = new Date(ms_time);
  //console.log('timeeeeeee',  ms_time.subtract(5, 'days').toDate());
  console.log('moment', moment().subtract(2, 'days').toDate().getTime());
  let id = req.params.id;
  let body = req.body.body;
  console.log('id', id);
  console.log('body', body);
  // передаю поки один параметр і шукає також
  let type1 = body.training_type[0];
  let type2 = body.training_type[1];
  let graphicMatchExpression = {};
  graphicMatchExpression['patient'] = id;
  graphicMatchExpression['hand'] = body.hand;
  graphicMatchExpression['training_type'] = type1;

 //if (type1 !== undefined && type2 === undefined){
 //  graphicMatchExpression['training_type'] = type1;
 //}
 //if(type2 !== undefined && type1 === undefined){

 //  graphicMatchExpression['training_type'] = type2;
 //}
  let b = moment().toDate().getTime().toString().slice(0, -3);



  if (body.val === 'day') {
    let days = 1;
    let a = moment().subtract(days, 'days').toDate().getTime().toString().slice(0, -3);
    graphicMatchExpression['started_time'] = { $gte: parseInt(a, 10), $lte: parseInt(b, 10)};
  }

  if (body.val === 'week') {
    let days = 7;
    let a = moment().subtract(days, 'days').toDate().getTime().toString().slice(0, -3);
    //console.log("a", a);
    //console.log("b", b);
    //console.log("parseeeeINTTTTTT", parseInt(a, 10));
    //   a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds()))
    graphicMatchExpression['started_time'] = { $gte: parseInt(a, 10), $lte: parseInt(b, 10)};
    console.log('moment1',moment().subtract(days, 'days').toDate().getTime());
    console.log('moment2', moment().toDate().getTime());
  }
  // console.log('=====================================================================', Date.UTC(a.getUTCFullYear(), a.getUTCMonth(),
  // Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
  //   date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())

  if (body.from && body.to) {
    graphicMatchExpression['started_time'] = {$gte: moment(body.from, "YYYY-MM-DD").toDate().getTime().toString().slice(0, -3) , $lte: moment(body.to.toString().slice(0, -3), "YYYY-MM-DD").toDate().getTime() };
    console.log('cpaka', graphicMatchExpression['started_time']);
  }
  patient.findById(id)
    .populate({
      model: 'graphic',
      path: 'graphic',
      match: graphicMatchExpression
    })
    .lean()
    .exec(function (err, session) {
      if (err) {
        res.json(err);
        intel.error(err);
      }
      else {

        for (let i = 0; i < session.graphic.length; i++){
          session.graphic[i].started_time = moment.unix(session.graphic[i].started_time);
        }
        res.json(session);
        intel.info('Got  session graph ', session);
      }
    });

  // if((body.from2 && body.to2) !== null)
  // {
  //   period2 = { $gte: moment(body.from2, "YYYY-MM-DD").toDate(), $lte: moment(body.to2, "YYYY-MM-DD").toDate() };
//
  //   patient.findById(id)
  //     .populate({ model: 'graphic', path: 'graphic', match: { patient: id , hand: body.hand, training_type: type1 , started_time: period2 }})
  //     .lean()
  //     .exec( function (err, session2) {
  //       if(err) {
  //         res.json(err);
  //         intel.error(err);
  //       }
  //       else {
  //         res.json(session2);
  //         console.log(session2);
  //         intel.info('Got  session graph ', session2);
  //       }
  //     });
//
//
  // }

}

// upload file
function patient_upload(req, res) {
  //if (req.headers['content-type'].indexOf('multipart/form-data') !== -1)  {
  upload1(req, res, function (err) {
    if (err) {
      res.send(err);
      return
    } else {
      if (req.file) {
        fs.readFile(req.file.path, 'utf-8', function (err, data) {
          if (err) throw err; // we'll not consider error handling for now
          let obj = JSON.parse(data);
          obj.patient = req.params.id;
          let started_time = obj.started_time;
          let value = obj.value;
          let hand = obj.hand;
          const newFile = new file();
          // newFile.filename = req.file.filename.substring(0, req.file.filename.lastIndexOf('.'));
          newFile.filename = req.file.filename;
          newFile.contentType = req.file.mimetype;

          newFile.save(function (err, newFile) {
            if (err) {
              res.sendStatus(400);
              res.json(err);
              intel.error(err);
            }
            else {
            }
// проверка на дубликат файла
            graphic.findOne({patient: req.params.id, started_time: started_time}, function (err, data) {
              //console.log('Value:'+data);
              if (err) {
                res.send(err);
              }
              else {

                if (data === null) {
                  let graphData = new graphic(obj);
                  graphData.save((error, graphdata) => {
                    if (error) {
                      res.json(err);
                      intel.error(err);
                    } else {
                      res.status(200).send(graphdata);
                    }
                  });
                  patient.findById(req.params.id)
                    .exec(function (err, patient) {
                      if (err) {
                        res.json(err);
                        intel.error(err);
                      }
                      else {
                        patient.graphic.push(graphData._id);
                        patient.save(patient);
                      }
                    });
                }
                else {
                  res.sendStatus(400);
                  //console.log('naideenoo');
                  //console.log('дубликат');
                }

              }
            });
            //        проверка на дубликаты айдишников пациэнтов для коллекции graphic, но как оказалось что она не нужна поскольку только один айди вставляетсья
            //  graphic.findById(graphData._id)
            //    .exec(function(err, patient) {
            //      if(err) {
            //        res.json(err);
            //        intel.error(err);
            //      } else
            //      {
            //      for(let i = 0; i< patient.patient ; i++){
            //          if(patient[i] =  req.params.id){
            //            delete patient[i];
            //          return patient
            //  }
            //      }
            //      }
            //    });

          });
        });
      }
    }
  })
}//}

// *** multer configuration *** //
let storage = multer.diskStorage({
  destination: UPLOAD_PATH,
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

let upload1 = multer({
  storage: storage,
  limits: {fileSize: 100 * 1024 * 1024},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('graph');

function checkFileType(file, cb) {
  const filetypes = /.json/;
  const extname = path.extname(file.originalname).toLowerCase();
  const isValidExtension = filetypes.test(extname);
  if (isValidExtension) {
    return cb(null, true);
  } else {
    cb('Error: Json only!');
  }
}

function allDoctors(req, res) {
  doctor.find({}, function (err, data) {
    //console.log('Value:'+data);
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);

    }
  })
}

module.exports = router;

