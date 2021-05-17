const User = require( '../models/user' )

function sendResult( res, result ) {
    res.setHeader( 'Content-Type', 'application/json' )

    res.status( result.status ).send( result.json )
}

module.exports = {
    postSignUp( req, res ) {
        const { name, surname, login, password } = req.body
        const points = 0
        const user = new User( { name, surname, login, password, points } )
        user.save( function( err ) {
            var result = {
                status: 200,
                json: {
                    message: 'Usuário cadastrado com sucesso!'
                }
            }

            if( err ) {
                console.log( err )
                result.status = 500
                result.json.message = 'Falha ao cadastrar usuário!'
            }

            sendResult( res, result )
        } )
    },

    postSignIn( req, res ) {
        const { login, password } = req.body
        User.findOne( { login: login, password: password }, function( err, user ) {
            var result = {
                status: 200,
                json: {
                    message: 'Login realizado com sucesso!'
                }
            }

            if( err ) {
                console.log( err )
                status = 500
                result.json.message = 'Falha ao buscar usuário e senha!'
            } else if( !user ) {
                result.status = 204
            }

            sendResult( res, result )
        } )
    },

    findAll( req, res ) {
        User.find( function( err, docs ) {
            var result = {
                status: 200,
                json: undefined
            }

            if( err ) {
                console.log( err )
                result.status = 500
                result.json = { message: 'Falha ao buscar usuários!' }
            } else {
                result.json = {
                    users: docs
                }
            }

            sendResult( res, result )
        } )
    }
}
