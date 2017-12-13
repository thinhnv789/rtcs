const mongoose = require('mongoose');

/**
 * Room  Mongo DB model
 * @name roomModel
 */
const roomSchema = new mongoose.Schema({
    roomName: { type: String, unique: true },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    description: {type: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: Number }, // active, inActive
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;