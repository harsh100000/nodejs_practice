var express = require('express');
var router = express.Router();
const userModel = require('./users')

router.get('/', function(req, res) {
  req.session.ban = true;
  res.render('index');
});

router.get('/check', function(req, res) {
  if(req.session.ban === true)
    {
      res.send("You are banned");
    }
});

router.get('/deleteban', function(req, res) {
  req.session.destroy((err)=>{
    if (err) throw err;
    res.send("Ban removed")
  })
});

router.get('/create', async function(req, res, next) {
  const crateduser = await userModel.create({
    username:"jai_vardhan_420",
    name:"Jai Vardhan",
    age:24,
  });
  res.send(crateduser);
});

router.get('/allusers', async function(req,res){
  let data = await userModel.find();
  res.send(data);
})

router.get('/oneuser', async function(req,res){
  let data = await userModel.findOne({name:"Jai Vardhan"});
  res.send(data);
})

router.get('/delete', async function(req,res){
  let data = await userModel.findOneAndDelete({name:"Harsh Vardhan"});
  res.send(data);
})

module.exports = router;

