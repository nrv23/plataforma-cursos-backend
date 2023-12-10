const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    role: {
        type: String,
        maxlength: 30,
        required: true
    },
    name: {
        type: String,
        maxlength: 80,
        required: true
    },
    surname: {
        type: String,
        maxlength: 80,
        required: true
    },
    email: {
        type: String,
        maxlength: 150,
        required: true,
        unique: true
    },
    password: {
        type: String,
        maxlength: 250,
        required: true
    },
    avatar: {
        type: String,
        maxlength: 250,
        required: false
    },
    state: {
        type: Boolean,
        default: true
    },
    phone :{
        type: String,
        maxlength: 20,
        required: false
    },
    birthdate :{
        type: Date,
        required: false
    },
    is_instructor: {
        type: Number,
        required: false,
        default: 1
    },
    profession: {
        type: String,
        maxlength: 250,
        required: false
    },
    description: {
        type: String,
        required: false
    }
},{
    timestamps: true
});


module.exports = mongoose.model('User', usuarioSchema);