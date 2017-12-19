const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
    country: { type: String }
});

module.exports = mongoose.model('User', UserSchema);