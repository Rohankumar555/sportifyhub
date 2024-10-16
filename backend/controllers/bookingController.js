const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Booking = require('../models/booking');  // Import models
const Center = require('../models/center');
const Sports = require('../models/sport');

dotenv.config();  

// Connect to MongoDB
require("../connection/db")

const getBookings = async (req, res) => {
    try {
        const sport = req.body.sport;
        const center = req.body.center;
        const court = req.body.court;
        const date = req.body.date;
        console.log(req.body);
        console.log(date);
        const bookings = await Booking.findOne({
            center_id: center,
            sport_id:sport,
            court_number:court,
            date: new Date(date)
        });
        if (!bookings) {
            res.json([]);
        } else {
            res.json(bookings.hour_slot);
        }
        return;
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


const createBooking = async (req, res) => {
    try {
        const { center_id, sport_id, court_number, date, hour_slot, booked_by } = req.body;
        console.log(req.body);
        if (!center_id  || !sport_id  || !court_number || !date || !hour_slot || !booked_by) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const booking = await Booking.findOne({
            center_id: center_id,
            sport_id: sport_id,
            court_number: court_number,
            date: new Date(date)
        });

        if (!booking) {
            const newBooking = new Booking({
                center_id,
                sport_id,
                court_number,
                date: new Date(date),
                hour_slot: [{ booked_by, hour: hour_slot }]
            });
            await newBooking.save();
            return res.status(201).json(newBooking);
        } else {
            booking.hour_slot.push({ booked_by, hour: hour_slot });
            await booking.save();
            return res.status(200).json(booking);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const viewBookings=async(req,res)=>{
    try{
        const {center_id,sport_id,date}=req.query;
        const records=  await Booking.find({
            center_id: center_id,
            sport_id: sport_id,
            date: new Date(date)
        });
        return records;
    }catch(err){
        return [];
    }
}


module.exports={createBooking,getBookings,viewBookings};