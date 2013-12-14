var lolApp = angular.module('lolApp', []);

lolApp.controller('LeftSummonerCtrl', function($scope){
   $scope.champions = [
      'Aatrox',
      'Kassadin',
      'Heimerdonger',
      'Orianna',
      'Darius',
      'Draven',
      'Thresh'
   ];

   $scope.queryUser = function(){
      console.log('test queryUser in LeftSummonerCtrl');
      //validate user input?
   }
});

lolApp.controller('RightSummonerCtrl', function($scope){
   $scope.champions = [
      'Aatrox',
      'Kassadin',
      'Heimerdonger',
      'Orianna',
      'Darius',
      'Draven',
      'Thresh'
   ];

   $scope.queryUser = function(){
      console.log('test queryUser in RightSummonerCtrl');
      //validate user input?
   }
});

lolApp.controller('StatComparisonCtrl', function($scope){
   //todo
});

lolApp.directive('summonerForm', function(){
   return {
      restrict: 'E',
      template:'<form role="form" ng-submit=queryUser()>'+
                  '<div class="col-xs-10">'+
                     '<input type="text" class="form-control margin-top-10" placeholder="Summoner Name">'+
                  '</div>'+
                  '<div class="col-xs-3 margin-top-10">'+
                     '<select class="form-control">'+
                        '<option value="na">NA</option>'+ 
                        '<option value="eu">EU</option>'+
                        '<option value="eune">EUNE</option>'+
                     '</select>'+
                  '</div>'+
                  '<button type="submit" class="btn btn-primary margin-top-10">Search Summoner</button>'+
               '</form>'
   }
})