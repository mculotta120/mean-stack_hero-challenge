var express = require('express');
var app = express();
var path = require('path');

app.use( express.static( 'public' ) );

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.listen( 3000, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 3000' );
});
