const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es requerido']
    },
    state: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema);