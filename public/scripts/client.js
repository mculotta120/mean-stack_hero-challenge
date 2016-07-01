console.log('sourced');

var myApp = angular.module('myApp', []);

myApp.controller( 'heroController', [ '$scope', '$http', function( $scope, $http ){
  $scope.powers = ["Invisibility", "Flight", "Super Speed", "Heat Vision", "Super Strength", "Accelerated Healing", "Power Blast", "Animal Affinity"];
  $scope.allHeroes = [];

  event.preventDefault();

  $scope.getHeroes = function(){//get records on call
      $http({
        method: 'GET',
        url: '/getHeroes'
      }).then( function ( response ){
        console.log( response );
          $scope.allHeroes = response.data; //pulls the data from app.js and sets to allHeroes
      }, function myError( response ){
        console.log( response.statusText );
      }); //end then
  };
  $scope.addHero = function(){ // adds hero on button click

    var objectToSend ={  // package object to send,
      alias: $scope.aliasBinder,
      first_name: $scope.first_nameBinder,
      last_name: $scope.last_nameBinder,
      city: $scope.cityBinder,
      power_name: $scope.power_nameSelect  // reference these in html

    }; //end objectToSend

    $http({  // sends object via POST
      method: 'POST',
      url: '/heroPost',
      data: objectToSend
    }); //end POST
    $scope.aliasBinder =''; // clears input boxes
    $scope.first_nameBinder ='';
    $scope.last_nameBinder ='';
    $scope.cityBinder = '';
    $scope.power_nameBinder = '';

    console.log( objectToSend, "added" );
  }; // end addHero function

  $scope.deleteHero = function(index){
    var heroObject = {
      id : $scope.allHeroes[index]._id
    };
    $http({
      method: 'POST',
      url: '/deletePost',
      data:heroObject
    });
    $scope.allHeroes.splice( index, 1 );
  }; //end deleteHero

}]); // end myApp.controller
