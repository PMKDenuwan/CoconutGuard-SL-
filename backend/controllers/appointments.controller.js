// Import the Appointment model to interact with the Appointment collection in the database
const Appointment = require('../models/appointments.model')
// Import the errorHandler utility to handle errors uniformly
const errorHandler = require('../utils/error')

// Define the createAppointment function to add new appointments to the database
const createAppointment = async (req, res, next) => {
    try {
        // Extract fields from request body
        const { fullName, email, phone, companyName, date, time, message, userId } = req.body

        // Check for required fields, return an error if any are missing
        if (!fullName || !email || !phone || !companyName || !date || !time ||!userId || !userId) {
            return next(errorHandler(400, 'Please fill out all the fields'))
        }

        // Create a new appointment instance
        const newAppointment = await Appointment({
            fullName,
            email,
            phone,
            companyName,
            date,
            time,
            message,
            userId //no comma
        })

        // Save the new appointment to the database -> await
        const savedAppointment = await newAppointment.save()

        // Respond with success message and saved appointment details
        res.status(201).json({ message: 'package created', savedAppointment })

    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error)
    }
}

// Define the getAppointment function to fetch appointments from the database
const getAppointment = async (req, res, next) => {
    try {
        // Determine the sort direction based on query parameter
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const query = {}

        // Filter by fullName, appointmentId, or userId if specified in query parameters
        if (req.query.fullName) {
            query.fullName = req.query.fullName
        }

        if (req.query.appointmentId) {
            query._id = req.query.appointmentId
        }

        if (req.query.userId) {
            query.userId = req.query.userId
        }

        // Count total appointments for pagination or reporting purposes (if needed)
        const totalAppointments = await Appointment.countDocuments()
       
        
        // Fetch appointments based on query and sort direction
        const appointment = await Appointment.find(query).sort({ updatedAt: sortDirection })
        res.status(200).json({ appointment, totalAppointments })

    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error)
    }
}

// Define the updateAppointment function to modify an existing appointment in the database
const updateAppointment = async (req, res, next) => {
    try {
        // Extract fields from request body
        const { fullName, email, phone, companyName, date, time, message, status } = req.body

        // Update the appointment with the specified ID, and return the updated document
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, {
            $set: {
                fullName,
                email,
                phone,
                companyName,
                date,
                time,
                message,
                status  //no comma
            }
        }, { new: true })

        // Respond with success message and updated appointment details
        res.status(200).json({ message: 'updated successfully', updatedAppointment })
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error)
    }
}

// Define the deleteAppointment function to remove an appointment from the database
const deleteAppointment = async (req, res, next) => {
    try {
        // Delete the appointment with the specified ID
        await Appointment.findByIdAndDelete(req.params.id)

        // Respond with a success message
        res.status(200).json({ message: 'Appointment has been deleted' })

    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error)
    }
}

// Export the CRUD operations to be used in routing
module.exports = { createAppointment, getAppointment, updateAppointment, deleteAppointment }
