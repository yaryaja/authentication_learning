//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require('md5');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});encryptedFields: ['age']



const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newuser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  newuser
    .save()
    .then((err) => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});


app.post("/login",(req,res)=>{
    const username=req.body.username;
    const passWord=md5(req.body.password);

    User.find({email:username},{password:passWord}).then((err)=>{
      if(err.length)
        res.render("secrets");
        else{
         
          res.render("login");
        }
      
}).catch((err)=>{
    console.log(err);
});
});

        
        
        
  


app.listen(3000, () => {
  console.log("port is listening");
});
