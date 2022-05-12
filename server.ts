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
const options = {
    root: path.join(__dirname)
};
app.use(cookieParser());
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
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
    let result = await staffAppreciation.find({}).sort({'_id': -1}) ;
    res.send(result)
});

app.get('/get', async (req, res) =>{
    let result
    if(req.query.name == 'All'){
        result = await staffAppreciation.find({}).sort({'_id': -1})
    } else{
        result = await staffAppreciation.find({ to: { "$regex": req.query.name+'$' }}).sort({'_id': -1})
    }
    res.json(result)
});

app.post('/submit', async (req, res) =>{
    
    const message = new staffAppreciation({
        to: req.body.to,
        message: req.body.message,
        from: req.body.from
      });
  
    const saveMessage = await message.save();
    res.json('done')
    })
   

var server = app.listen(port,host, function () {
    console.log('Node server is running..');
});