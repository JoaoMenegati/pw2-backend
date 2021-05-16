const express = require( 'express' )
const route = express.Router()

module.exports = route

//Import controllers
const controllerUser = require( '../controllers/controller-user' )
const controllerQuestion = require( '../controllers/controller-question' )

route.post( '/user/signup', function( req, res ) {
    controllerUser.postSignUp( req, res )
} )

route.post( '/user/signin', controllerUser.postSignIn )

route.get( '/question/find', controllerQuestion.findQuestions )
