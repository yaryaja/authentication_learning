//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = {
  email: String,
  password: String,
};
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
    password: req.body.password,
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
    const passWord=req.body.password;

    User.find({email:username},{password:passWord}).then((err)=>{
        res.render("secrets");
}).catch((err)=>{
    console.log(err);
});
});

        
        
        
  


app.listen(3000, () => {
  console.log("port is listening");
});
