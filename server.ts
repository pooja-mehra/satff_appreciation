var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");
var cors = require('cors');
var cookieParser = require('cookie-parser')
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_URI;
const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    console.log(req.headers);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });
  var mongoConnection =mongoose
 
  .connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

  const schema = mongoose.Schema({
	to: String,
	message: String,
    from:String
    })

const staffAppreciation = mongoose.model("staff_appreciation", schema)

// define routes here..
app.get('/', async (req, res) =>{
    var options = {
        root: path.join(__dirname)
    };
   
    var fileName = 'index.html';
   
    res.sendFile(fileName, options, async (err) =>{
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });
});

app.get('/send', async (req, res) =>{
    var options = {
        root: path.join(__dirname)
    };
   
    var fileName = 'wish.html';
   
    res.sendFile(fileName, options, async (err) =>{
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });
});

app.get('/getAll', async (req, res) =>{
    let result = await staffAppreciation.find({});
    console.log(result)
    res.send(result)
});

app.get('/getByName', async (req, res) =>{
    let result = await staffAppreciation.find({ to: 'wqjd'})
        res.json(result)
});

app.post('/submit', async (req, res) =>{
    
    const message = new staffAppreciation({
        to: req.body.to,
        message: req.body.message,
        from: req.body.from
      });
  
      const saveMessage = await message.save();
      var options = {
        root: path.join(__dirname)
    };
   
    var fileName = 'index.html';
   
    res.sendFile(fileName, options, async (err) =>{
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });
    })
   

var server = app.listen(port,host, function () {
    console.log('Node server is running..');
});