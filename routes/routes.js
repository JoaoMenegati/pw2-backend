const express = require( 'express' )
const route = express.Router()

module.exports = route

//Import controllers
const controllerUser = require( '../controllers/controller-user' )

route.post( '/user/signup', function( req, res ) {
    controllerUser.postSignUp( req, res )
} )

route.post( '/user/signin', controllerUser.postSignIn )
