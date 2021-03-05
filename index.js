var express = require('express')
var app = express()

app.get('/', function (req, res) {
  console.log("Request Received!")
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('API listening on port 8000')
})