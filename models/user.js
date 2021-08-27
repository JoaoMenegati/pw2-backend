const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const User = Schema ( {
    name: { type: String, required: false },
    surname: { type: String, required: false },
    login: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, required: true },
    admin: { type: Boolean, default: false, required: true },
} )

module.exports = mongoose.model( 'User', User )
