var mongoose = require('mongoose');  // require mongoose for mongo db
var Schema = mongoose.Schema;

var heroSchema = new mongoose.Schema({  // set up new mongoose schema
  alias: String,
  first_name: String,
  last_name: String,
  city: String,
  power_name: String
});

var heroescollection = mongoose.model( 'heroescollection', heroSchema );  // sets schema to model var

module.exports=heroescollection;
