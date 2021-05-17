const Question = require( '../models/question' )
const Utils = require( '../utils' )

function sendResult( res, result ) {
    res.setHeader( 'Content-Type', 'application/json' )

    res.status( result.status ).send( result.json )
}

module.exports = {
    initDatabase() {
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
    },

    findQuestions( req, res ) {
         Question.find( function( err, docs ) {
            var result = {
                status: 200,
                json: undefined
            }

            if( err ) {
                console.log( err )
                result.status = 500
                result.json = { message: 'Falha ao buscar questões!' }
            } else {
                const randomQuestions = []
                var size = docs.length
                for( var i = 0; i < 5; i++ ) {

                    var index = Math.floor( Math.random() * size )
                    const question = docs[ index ]

                    randomQuestions.push( question )
                    docs.splice( index, 1 )

                    size--
                }
                result.json = {
                    results: randomQuestions
                }
            }

            sendResult( res, result )
         } )
    }
}
