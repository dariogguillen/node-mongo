var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var app = express()

// Connection to DB
mongoose.connect('mongodb://localhost/clients', function(err, res) {
  if (err) throw err
  console.log('Connected to Database')
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())

// import Models and Controllers
var models = require('./models/client')
var ClientCtrl = require('./controllers/client')

var router = express.Router()

// Index
router.get('/', function(req, res) {
  res.send('Hola Mundo!')
})

app.use(router)

// API routes
var api = express.Router()

api
  .route('/clients')
  .get(ClientCtrl.findAll)
  .post(ClientCtrl.add)

api
  .route('/clients/:id')
  .get(ClientCtrl.findById)
  .put(ClientCtrl.update)
  .delete(ClientCtrl.delete)

app.use('/api', api)

// Start server
app.listen(3000, function() {
  console.log('Node server running on http://localhost:3000')
})
