const express = require('express');
const Booking = require('../models/booking');  // Import models
const Center = require('../models/center');
const Sports = require('../models/sport');

const getSportsByCenter= async (req, res) => {     //{/api/centers/:centerId/sports}     // View all sports offered by a center
    try {
        const center = await Center.findById(req.params.centerId).populate('sports', 'name courts');
        res.json(center);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


const createCenter= async (req, res) => {        //{/api/centers}  // Create a new center
    try {
        const { name, sports } = req.body;
        const newCenter = new Center({ name, sports });
        await newCenter.save();
        res.status(201).json(newCenter);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={getSportsByCenter,createCenter};
