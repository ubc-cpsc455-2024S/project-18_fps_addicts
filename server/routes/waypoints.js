const express = require('express');
var router = express.Router();
const Waypoint = require('../models/Waypoint');


router.get('/waypoints', async (req, res) => {
    const waypoints = await Waypoint.find();
    res.json(waypoints);
});

router.post('/waypoints', async (req, res) => {
    const waypoint = new Waypoint(req.body);
    await waypoint.save();
    res.json(waypoint);
});

module.exports = router;

