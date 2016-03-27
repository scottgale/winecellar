// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SensorReadingSchema   = new Schema({
    dateofreading: { type: Date, default: Date.now },
    humidity: Number,
    temp: Number
});

module.exports = mongoose.model('SensorReading', SensorReadingSchema);