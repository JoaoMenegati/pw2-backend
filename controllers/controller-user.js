const User = require( '../models/user' )

function sendResult( res, result ) {
    res.setHeader( 'Content-Type', 'application/json' )

    res.status( result.status ).send( result.json )
}

module.exports = {
    async postSignUp( req, res ) {
        const { name, surname, login, password } = req.body
        const points = 0

        var result = {
            status: 200,
            json: {
                message: 'Usuário cadastrado com sucesso!'
            }
        }

        if( !name || !surname || !login || !password ) {
            result.status = 400
            result.json.message = 'Um ou mais campos obrigatórios não informados!'
        } else {
            await User.findOne( { login: login }, function( err, user ) {
                if( user ) {
                    result.status = 400
                    result.json.message = 'Nome de usuário indisponível!'
                } else {
                    const user = new User( { name, surname, login, password, points } )
                    user.save( function( err ) {
                        if( err ) {
                            console.log( err )
                            result.status = 500
                            result.json.message = 'Falha ao cadastrar usuário!'
                        }
                    } )
                }
            } )
        }

        sendResult( res, result )
    },

    async postSignIn( req, res ) {
        const { login, password } = req.body
        await User.findOne( { login: login, password: password }, function( err, user ) {
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

    async findAll( req, res ) {
        await User.find( function( err, docs ) {
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
    },

    async updatePoints( req, res ) {
        const { login, points } = req.body
        
        await User.findOne( { login: login }, function( err, user ) {
            var result = {
                status: 200,
                json: {
                    message: 'Pontos atualizados com Sucesso!'
                }
            }

            if( err ) {
                console.log( err )
                status = 500
                result.json.message = 'Falha ao atualizar pontos!'
            } else if( user ) {
                user.points += points
                user.save( function( err ) { 
                    console.log( err )
                    status = 500
                    result.json.message = 'Falha ao atualizar pontos!'
                } )
            }

            sendResult( res, result )
        } )
    }
}
