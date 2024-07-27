const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    expires: {
        type: Date
    },
    session: String,
}, {
    _id: false, // Disable automatic _id generation
    strict: false, // Allow fields that are not specified in the schema
    collection: 'sessions'
});

const Auth = mongoose.model('Session', authSchema);

module.exports = Auth;
