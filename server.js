// Get the packages we need
var express = require('express');
// Create our Express application
var app = express();
//require path for managing file system requests
var path = require("path");

//sanitizing
var sanitizer = require('sanitizer');

//db connection 
var mongoose   = require('mongoose');
var mongoDBConnection = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoDBConnection); // connect to our database

//import wine cellar data model for sensors
var SensorReading = require('./models/sensorReading');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Create our Express router
var webRouter = express.Router();

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on wine!' });
  console.log(req);
  console.log(res);
});



router.route('/sensorreadings')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {        
        console.log("initiate post");
        //console.log(res);

        var sensorReading = new SensorReading();      // create a new instance of the Bear model
        console.log("Humidity:" + req.body.humidity);
        console.log("Temp:" + req.body.temp);
        sensorReading.dateofreading = new Date();  // set the bears name (comes from the request)
        sensorReading.humidity = sanitizer.escape(req.body.humidity);  // set the bears name (comes from the request)
        sensorReading.temp = sanitizer.escape(req.body.temp);  // set the bears name (comes from the request)

        // save the sensor reading and check for errors
        console.log("initiate sensor reading save");
        sensorReading.save(function(err) {
            if (err)
                handleError(res, err.message, "Failed to create new sensor reading.");
            else
                res.json({ message: 'Sensor created!' });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        SensorReading.find(function(err, sensorReadings) {
            if (err)
                handleError(res, err.message, "Failed to get sensor readings.");
            else
                res.json(sensorReadings);
        });
    });    

// Register all our routes with /api
app.use('/api', router);

//router for web
webRouter.route('/sensorreadings')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        res.sendFile(path.join(__dirname+'/test.html'));
    });    

// Register all our web routes with /web
app.use('/web', webRouter)    

// Start the server
app.listen(port);
console.log('Insert wine cellar data on port ' + port);



