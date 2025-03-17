const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: { type: String, require: true },
    companyname: {type: String, require: true},
    address: { type: String, require: true },
    projectID: { type: String, require: true },
    phone: { type: String, require: true},
    duration: {type: String, require:true},
   

}, { timestamps: true })

const Clients = mongoose.model('Clients', clientSchema)
module.exports = Clients