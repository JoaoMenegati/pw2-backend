const User = require( '../models/user' )

function sendResult( res, result ) {
    res.setHeader( 'Content-Type', 'application/json' )

    res.status( result.status ).send( result.json )
}

module.exports = {
    postSignUp( req, res ) {
        const { name, surname, login, email, password } = req.body
        const user = new User( { name, surname, login, email, password } )
        user.save( function( err ) {
            var result = {
                status: 200,
                json: {
                    message: 'Usuário cadastro com sucesso!'
                }
            }

            if( err ) {
                result.status = 200
                result.json.message = 'Falha ao cadastrar usuário!'
            }

            sendResult( res, result )
        } )
    }
}
