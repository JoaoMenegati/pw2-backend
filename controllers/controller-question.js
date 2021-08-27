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
                    question.dificulty = questionFromList.dificulty
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
        var dificulty = parseInt(req.query.dificulty)
        if( !dificulty || dificulty < 1){
            dificulty = 1
        }

        Question.find({ dificulty: dificulty }, function( err, docs ) {
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
    },

    async findAllQuestions( req, res ) {
        await Question.find( function( err, docs ) {
            var result = {
                status: 200,
                json: undefined
            }

            if( err ) {
                console.log( err )
                result.status = 500
                result.json = { message: 'Falha ao buscar questões!' }
            } else {
                result.json = {
                    results: docs
                }
            }

            sendResult( res, result )
        } )
    },

    async postQuestions(req, res){
        const { question, correctAnswer, incorrectAnswers, dificulty } = req.body

        var result = {
            status: 200,
            json: {
                message: 'Questões atualizadas com sucesso!'
            }
        }

        if( !question || !correctAnswer || !incorrectAnswers || !dificulty ) {
            result.status = 400
            result.json.message = 'Um ou mais campos obrigatórios não informados!'
        } else {
            await Question.findOne( { question: question }, function( err, questionResp ) {
                if( err ) {
                    console.log( err )
                    status = 500
                    result.json.message = 'Falha ao atualizar questão!'
                } else if( questionResp ) {
                    questionResp.question = question;
                    questionResp.correctAnswer = correctAnswer;
                    questionResp.incorrectAnswers = incorrectAnswers;
                    questionResp.dificulty = dificulty;

                    questionResp.save( function( err ) { 
                        console.log( err )
                        status = 500
                        result.json.message = 'Falha ao atualizar questão!'
                    } )
                }
            } )
        }

        sendResult( res, result )
    }
}
