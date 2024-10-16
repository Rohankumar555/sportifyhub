const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    center_id: {
        type: String,
        ref: 'Center',
        required: true
    },
    sport_id: {
        type: String,
        ref: 'Sports',
        required: true
    },
    court_number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour_slot: [
        {
            booked_by: {
                type: String,
                required: true
            },
            hour: {
                type: Number,
                required: true
            }
        }
    ]
});

bookingSchema.index(
    { center_id: 1, sport_id: 1, court_number: 1, date: 1, hour_slot: 1 },
    { unique: true }
  );

module.exports = mongoose.model('Booking', bookingSchema);