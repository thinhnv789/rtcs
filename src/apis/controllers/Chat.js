const jwt = require('jsonwebtoken');
const ClientAccount = require('./../../models/ClientAccount');

/**
 * Passport
 */
const passport = require('./../../middleware/passport');

/**
 * GET /api/chat/customers
 */
exports.getCustomers = (req, res, next) => {
    ClientAccount.find({}, (err, customers) => {
        if (err) {
            return res.json({
                success: false
            });
        } else {
            return res.json({
                success: true,
                customers: customers
            });
        }
    });
};