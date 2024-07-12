const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    picture: String
}, {
    _id: false, // Disable automatic _id generation
    strict: false // Allow fields that are not specified in the schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
