const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

/**
 * Aclient Account  Mongo DB model
 * @name clientAccountModel
 */
const aclientAccountSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String},

    status: { type: Number }, // active, block, reported
    isOnline: { type: Boolean },
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}]
}, {timestamps: true});

const ClientAccount = mongoose.model('ClientAccount', aclientAccountSchema);

module.exports = ClientAccount;