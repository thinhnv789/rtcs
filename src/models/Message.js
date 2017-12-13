const mongoose = require('mongoose');

/**
 * Group  Mongo DB model
 * @name messageModel
 */
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId},
    recipient: {type: mongoose.Schema.Types.ObjectId},
    messageContent: { type: String },
    status: { type: number }, // active, deleted
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    updatedBy: {type: mongoose.Schema.Types.ObjectId}
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;