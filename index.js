const express = require('express');

const app = express();

const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose.connect("mongodb+srv://Nagasatish143:<password>@cluster0.ezd3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
  console.log('connected to mongo!');
});
const connection = mongoose.connection;

app.get('/',function(req,res){
  const book = new mongoose.Schema({
    name : {
      type:String,
      required:true
    },
    author:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    }
  });
  const Book = connection.model('Book',book);
  Book.find({},function(err,result){
    if(err)
        console.log('Error : '+err);
    else
        console.log(result);
  })



  res.sendFile(__dirname + '/index.html');
});
app.get('/subscribe',function(req,res){
  res.sendFile(__dirname + '/subscribe.html');
});
app.post('/subscribe',function(req,res){
  const book = new mongoose.Schema({
    user_name:{
      type:String,
      required:true
    },
    user_email:{
      type:String,
      required:true
    }
  });
  const Book = connection.model('Book',book);
  Book.create({user_name:req.body.username, user_email:req.body.useremail},function(err){
    if(err)
      console.log("something went wrong : "+err);

    

    
    else
    {
      console.log("user added!");
      res.redirect('/');
    }
  
  });
});
app.post('/borrow',function(req,res){
})
app.listen(3000,()=>{
  console.log("running!");
});
  