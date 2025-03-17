const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    companyName: { type: String, require: true },
    date: { type: String, require: true },
    time: { type: String, require: true },
    message: { type: String,require: true },
    status: { type: String, default: 'pending' },
    userId: { type: String, require: true }

}, { timestamps: true })

const Appointments = mongoose.model('Appointments', appointmentSchema)
module.exports = Appointments