const fs = require( 'fs' )

exports.readFromFile = function( file ) {
    const path = __dirname + '/' + file
    const json = fs.readFileSync( path, 'utf-8' )

    return json
}