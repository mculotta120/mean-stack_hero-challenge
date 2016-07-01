var express = require('express');
var app = express();

var bodyParser = require('body-parser');  // require bodyparser for POST calls
var mongoose = require('mongoose');  // require mongoose for mongo db
var path = require('path');

var removehero = require('../routes/removehero'); //require route

var heroescollection = require('../models/heroes.js');  // requiring the heroes model

mongoose.connect('localhost:/herodb');

app.use( bodyParser.json() );

app.use( '/deletePost', removehero); //use removehero route
app.use( express.static( 'public' ) );

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.get( '/getheroes', function( req, res ){  // GET function to retrieve data
  heroescollection.find() // This is where the magic happens - all new and existing are found here
  .then( function( data ){  // similar to ajax get call - if found, then run function with data as parameter
    // console.log("data from app" + data);
    res.send( data );  // returns records as "data"
  });
});

app.post( '/heroPost', function( req, res ){  // POST call
  var recordToAdd={  // adds record from input
    alias: req.body.alias,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    power_name: req.body.power_name
  };
  var newRecord=heroescollection( recordToAdd );  // saves record to database
  newRecord.save();
  console.log( recordToAdd, "added" );
});


// app.post('/deletePost', function (req, res){
//   var heroToDelete = {
//     id : req.body.id
//     };// end heroToDelete
//   heroescollection.findOne({_id:req.body.id}, function(err, heroesResult){
//   if(err){
//     console.log(err);
//     res.sendStatus(500);
//   }else{
//     heroescollection.remove({_id:req.body.id}, function(err){});
//     console.log(req.body.id + " removed");
//     res.sendStatus(200);
//   }
//   }); //end findOne
// });// end deletePost

app.listen( 4242, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 4242' );
});
