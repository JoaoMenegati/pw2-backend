var express = require('express')
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )

const config = require( './config/config' )
const routes = require( './routes/routes' )
const controllerQuestion = require( './controllers/controller-question' )
const middlewares = require( './middlewares/middlewares' )

const app = express()

//Connect to database
mongoose.connect( config.connection, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true } )
  .then( () => console.log( 'Connected successfully to MongoDB!' ) )
  .catch( err => console.log( err ) )

//Configure express
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

//Configure CORS
app.use( cors( { origin: 'http://localhost:3000' } ) )

//Add middleware
app.use( middlewares.logRegister )

//Add routes
app.use( routes )

//Start the application on port 8081
app.listen( 8080, () => console.log( 'Server started on 8080!' ) )

//Init the questions collection
controllerQuestion.initDatabase()