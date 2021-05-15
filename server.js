var express = require('express')
const mongoose = require( 'mongoose' )

const config = require( './config/config' )
const routes = require( './routes/routes' )

const app = express()

//Connect to database
mongoose.connect( config.connection, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true } )
  .then( () => console.log( 'Connected successfully to MongoDB!' ) )
  .catch( err => console.log( err ) )

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( routes )

//Start the application on port 8081
app.listen( 8080, () => console.log( 'Server started on 8080!' ) )
