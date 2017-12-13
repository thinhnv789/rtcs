var mongoose = require('mongoose');

/**
 * Role  Mongo DB model
 * @name roleModel
 */
const roleSchema = new mongoose.Schema({
    name: {type: String},
    ident: {type: String, unique: true},
    description: {type: String},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: Boolean,
}, {timestamps: true});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;