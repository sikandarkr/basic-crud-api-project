

var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var todo = require('./routes/routes');
const app = express();
app.use(express.json()); // Make sure it comes back as json
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

const uri = "mongodb+srv://username:password@cluster0.b6vck.mongodb.net/databasename?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log("Error", err));
//app.use is a way to register middleware or chain of middleware so here we are registering routes
app.use('/todo', todo);

app.listen(3000, () => { console.log('Server is running...') });
