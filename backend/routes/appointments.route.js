const express = require('express')
const { createAppointment, getAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointments.controller')
const router = express.Router()

router.post('/', createAppointment)
router.get('/', getAppointment)   //get total count
router.put('/:id', updateAppointment)  //change appointment status
router.delete('/:id', deleteAppointment)

module.exports = router