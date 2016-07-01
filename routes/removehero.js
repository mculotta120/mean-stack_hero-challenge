var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var heroescollection = require('../models/heroes.js');  // requiring the heroes model

var router = express.Router();

router.post('/', function (req, res){
  var heroToDelete = {
    id : req.body.id
    };// end heroToDelete
  heroescollection.findOne({_id:req.body.id}, function(err, heroesResult){
  if(err){
    console.log(err);
    res.sendStatus(500);
  }else{
    heroescollection.remove({_id:req.body.id}, function(err){});
    console.log(req.body.id + " removed");
    res.sendStatus(200);
  }
  }); //end findOne
});// end deletePost

module.exports = router;
