const express = require( 'express' )
const route = express.Router()

module.exports = route

//Import controllers
const controllerUser = require( '../controllers/controller-user' )
const controllerQuestion = require( '../controllers/controller-question' )

//User routes
route.post( '/user/signup', controllerUser.postSignUp )
route.post( '/user/signin', controllerUser.postSignIn )
route.get( '/user/findAll', controllerUser.findAll )

//Question routes
route.get( '/question/find', controllerQuestion.findQuestions )

//Points routes
route.post( '/point/update', controllerUser.updatePoints )
