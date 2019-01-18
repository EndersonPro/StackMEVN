const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username requerido']
    },
    firstname: {
        type: String,
        required: [true, 'El nombre del usuario es requerido']
    },
    lastname: {
        type: String,
        required: [true, 'El nombre del usuario es requerido']
    },
    email:{
        type: String,
        required:[true, 'Email requerido']
    }
})

module.exports = mongoose.model('User', UserSchema);