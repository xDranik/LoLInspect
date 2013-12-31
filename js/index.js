var lolApp = angular.module('lolApp', []);

lolApp.controller('LeftSummonerCtrl', function($scope, $http){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;
   $scope.apikey = '???';

   $scope.querySummoner = function(){

      getSummonerIDFromName($scope, $http);

   }
});


function getSummonerIDFromName($scope, $http){
   var region = $scope.region.toLowerCase();
   var summonerName = $scope.summonerName || '';

   if(summonerName.length < 3 || summonerName.length > 16){
      //don't query, show no matches?
      $scope.showSummoner = false;
      return;
   }

   $http({
      method: 'GET', 
      url: 'http://prod.api.pvp.net/api/lol/'+region+'/v1.2/summoner/by-name/'+
            summonerName+'?api_key='+$scope.apikey
   })
   .success(function(data, status, headers, config){

      $scope.showSummoner = true;
      console.log(data);
      getSummonerRankedStats($scope, $http, data.id)

   })
   .error(function(data, status, headers, config){
      
      $scope.showSummoner = false;
      console.log('Error on GET to /api/lol/'+ $scope.region +
         'v1.2/summoner/by-name/' + summonerName);
      console.log('HTTP status code: ' + status);

   });
}

function getSummonerRankedStats($scope, $http, summonerID){

   var region = $scope.region.toLowerCase();
   $http({
      method: 'GET',
      url: 'http://prod.api.pvp.net/api/lol/'+region+'/v1.2/stats/by-summoner/' +
      summonerID+'/ranked?season=SEASON3&api_key='+$scope.apikey
   })
   .success(function(data, status, headers, config){
      console.log(data);
   })
   .error(function(data, status, headers, config){
      console.log('faku in get ranked stats');
   });

}

function handleStatResponse($scope){

}



lolApp.controller('RightSummonerCtrl', function($scope){

   $scope.regions = ['NA', 'EU', 'EUNE'];
   $scope.region = $scope.regions[0];

   $scope.queryUser = function(){
      console.log('test queryUser in RightSummonerCtrl');
      //validate user input?
   }
});

lolApp.controller('ComparisonCtrl', function($scope){
   //todo
});

lolApp.directive('summonerForm', function(){
   return {
      restrict: 'E',
      template:'<form role="form" ng-submit=querySummoner()>'+
                  '<div class="col-xs-10">'+
                     '<input type="text" class="form-control margin-top-10" placeholder="Summoner Name" ng-model="summonerName">'+
                  '</div>'+
                  '<div class="col-xs-4 margin-top-10">'+
                     '<select class="form-control" ng-model="region" ng-options="r.toString() for r in regions">'+
                     '</select>'+
                  '</div>'+
                  '<button type="submit" class="btn btn-primary margin-top-10">Search Summoner</button>'+
               '</form>'
   }
})