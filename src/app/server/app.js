let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');
let http = require('http');
let https = require('https');
let intel = require('intel');
let fs = require('fs');
let morgan = require('morgan');
let corsOptions = require('./config/cors');
let config = require ('./config/config');
let forceSsl = require('force-ssl');

let app = express();



app.options('*', cors(corsOptions));

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

/* логгирование */
intel.addHandler(new intel.handlers.File('./logs/file.log'));
/* логгирование */


const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});
// *** config middleware *** //
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.raw({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[clf] :http-version', {stream: accessLogStream}));




app.get('/', (req, res) => {
  res.send('Privet');
});

/* routes  */
var clientRoutes = require('./routes/patient_routes');

app.get('/ ', (req, res) => {});
app.post('/', (req, res) => {});
app.delete('/', (req, res) => {});
app.put('/', (req, res) => {});



mongoose.connect(config.db.database,  { useNewUrlParser: true } ,(err, res) => {

  if(err) {
    console.log('Database error: ' + err);
    intel.error("ERROR ", err);
  } else {
    console.log('Connected to database ' + config.db.database);

    intel.info('Connected to database %s', config.db.database);
  }

});






const server = app.listen(config.serverPort, () => {
  console.log('Server is up and running on port ' + config.serverPort + '; ' + 'alo gusak');

});
console.log("Hello :)");




// *** main routes *** //
app.use('/api',  clientRoutes);
module.exports = server;
