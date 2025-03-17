const express = require('express')
const { createClient, getClient, updateClient, deleteClient } = require('../controllers/client.controller')
const router = express.Router()

router.post('/', createClient)
router.get('/', getClient)
router.put('/:id', updateClient)
router.delete('/:id', deleteClient)

module.exports = router