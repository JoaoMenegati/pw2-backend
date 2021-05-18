module.exports = {
    logRegister( req, res, next ) {
        const dateLog = '[' + new Date() + ']'
        const methodLog = '[' + req.method + ']'

        console.log( dateLog + ' ' + methodLog + ' ' + req.url )
        next()
    }
}
