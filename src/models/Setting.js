const mongoose = require('mongoose');

/**
 * Room  Mongo DB model
 * @name settingModel
 */
const settingSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    value: {type: String},
    description: {type: String},
}, {timestamps: true});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;