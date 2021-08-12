const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const Question = Schema ( {
    question: { type: String, required:true },
    correctAnswer: { type: String, required:true },
    incorrectAnswers: { type: Array, required:true },
    dificulty: { type: Number, required:true },
} )

module.exports = mongoose.model( 'Question', Question )
