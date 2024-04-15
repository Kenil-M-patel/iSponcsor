const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    LasttName: { type: String, required: true},
    email: { type: String,  required: true, unique: true },
    password: { type: String, required: true }, // hash 
    location: {
        country: { type: String, required: true },
        city: { type: String, required: true } 
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user