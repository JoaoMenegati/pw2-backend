var express = require('express')
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )

const config = require( './config/config' )
const routes = require( './routes/routes' )
const controllerQuestion = require( './controllers/controller-question' )

const app = express()

//Connect to database
mongoose.connect( config.connection, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true } )
  .then( () => console.log( 'Connected successfully to MongoDB!' ) )
  .catch( err => console.log( err ) )

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

var whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000']
var corsOptions = {
  origin: function( origin, callback ) {
    if( whitelist.indexOf( origin ) !== -1 ) {
      callback( null, true )
    } else {
      callback( new Error( 'Not allowed by CORS' ) )
    }
  }
}

app.use( cors( corsOptions ) )

app.use( routes )

//Start the application on port 8081
app.listen( 8080, () => console.log( 'Server started on 8080!' ) )


controllerQuestion.initDatabase()