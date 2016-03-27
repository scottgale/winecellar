// Get the packages we need
var express = require('express');
// Create our Express application
var app = express();
//require path for managing file system requests
var path = require("path");



//db connection 
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database

//import wine cellar data model for sensors
var SensorReading = require('./models/sensorReading');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Create our Express router
var webRouter = express.Router();

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
        var sensorReading = new SensorReading();      // create a new instance of the Bear model

        sensorReading.dateofreading = req.headers.dateofreading;  // set the bears name (comes from the request)
        sensorReading.humidity = req.headers.humidity;  // set the bears name (comes from the request)
        sensorReading.temp = req.headers.temp;  // set the bears name (comes from the request)

        // save the bear and check for errors
        sensorReading.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Sensor created!' });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        SensorReading.find(function(err, sensorReadings) {
            if (err)
                res.send(err);

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



