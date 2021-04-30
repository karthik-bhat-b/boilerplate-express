var express = require('express');
var app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use('/public',express.static('public'))

app.use(function (req,res,next){
  console.log(req.method+' '+ req.path+" - "+ req.ip);
  next();
})
app.get("/",function(req,res){
  console.log("Hello World")
  res.sendFile(__dirname+'/views/index.html');
})

app.get('/json',function(req,res){
var obj={"message": "Hello json"}
if(process.env.MESSAGE_STYLE=='uppercase'){
obj.message=obj.message.toUpperCase()
}
})

app.get('/now',function(req,res,next){
  req.time = new Date().toString();
  next()
},function(req,res){
  res.json( {'time' :req.time })
})

app.get('/:word/echo',function(req,res){
  res.json({'echo' : req.params.word})
})

app.get('/name',function(req,res){
  res.json({'name' : req.query.first + ' ' +req.query.last })
})

app.post('/name',function(req,res){
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
})

 module.exports = app;
