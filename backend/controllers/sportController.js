const express = require('express');
const Booking = require('../models/booking');  // Import models
const Center = require('../models/center');
const Sports = require('../models/sport');
require('../connection/db')
const getSport= async (req, res) => {                // View all sports
    try {
        const sports = await Sports.find();
        res.json(sports);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getCourt=async  (req,res)=>{
    try {
        const {sport_id}=req.query
        console.log(sport_id)
        const courts = await Sports.findOne({ name:sport_id }).lean();
        console.log(courts);
        res.status(200).json(courts['courts']);
    } catch (error) {
        res.status(500).json({error:'Server'});
    }
}
const createSport=async (req, res) => {                   // Create a new sport
    try {
        const { name, courts } = req.body;
        const newSport = new Sports({ name, courts });
        await newSport.save();
        res.status(201).json(newSport);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={getSport,createSport,getCourt};
