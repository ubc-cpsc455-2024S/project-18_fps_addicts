const mongoose = require('mongoose');

const waypointSchema = new mongoose.Schema({
    id: String,
    title: String,
    address: String,
    description: String,
    capacity: String,
    link: String,
    coordinates: [Number], 
    imageUrl: String
});

const Waypoint = mongoose.model('Waypoint', waypointSchema);

module.exports = Waypoint;
