const Question = require( '../models/question' )
const Utils = require( '../utils' )

function sendResult( res, result ) {
    res.setHeader( 'Content-Type', 'application/json' )

    res.status( result.status ).send( result.json )
}

module.exports = {
    initDatabase() {
        const a = Question.countDocuments()

        Question.estimatedDocumentCount( function( err, count ) {
            if( count == 0 ) {
                const questions = JSON.parse( Utils.readFromFile( '/questions/questions.json' ) ).questions
                questions.forEach( questionFromList => {
                    const question = new Question()
                    question.question = questionFromList.question
                    question.correctAnswer = questionFromList.correctAnswer
                    question.incorrectAnswers = questionFromList.incorrectAnswers
                    question.save( function( err ) {
                        if( err ) {
                            console.log( err )
                        }
                    } )
                } )
            }
        } ) 
    }
}
