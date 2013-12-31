var lolApp = angular.module('lolApp', []);

lolApp.factory('StatCompareService', function(){

   return {
      leftChampionData: {name: '?'},
      rightChampionData: {name: '?'},
      comparisonData: undefined
   }

});

lolApp.controller('LeftSummonerCtrl', function($scope, $http, StatCompareService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;
   $scope.apikey = '???';

   $scope.champions = [];


   $scope.querySummoner = function(){
      getSummonerIDFromName($scope, $http);
   }

   $scope.updateStatCompareData = function(champion){
      StatCompareService.leftChampionData = champion;
      console.log(StatCompareService);
   }

   $scope.test = StatCompareService.leftChampionData.name;

});


lolApp.controller('RightSummonerCtrl', function($scope, $http, StatCompareService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;
   $scope.apikey = '???';

   $scope.champions = [];

   $scope.querySummoner = function(){
      getSummonerIDFromName($scope, $http);
   }


   $scope.updateStatCompareData = function(champion){
      StatCompareService.rightChampionData = champion;
      console.log(StatCompareService);
   }

});

lolApp.controller('ComparisonCtrl', function($scope, StatCompareService){

   $scope.leftChampionName = StatCompareService;
   $scope.rightChampionName = StatCompareService;
   $scope.statTableRows = [];

   $scope.compareStats = function(){
      console.log('faku');

      $scope.statTableRows = [];
      var tmpStatTableRows = [];

      for(var stat in StatCompareService.leftChampionData.stats){

         tmpStatTableRows.push(
            {
               leftStats: StatCompareService.leftChampionData.stats[stat],
               statName: stat,
               rightStats: StatCompareService.rightChampionData.stats[stat]
            }
         );

      }

      $scope.statTableRows = tmpStatTableRows.filter(function(row){
         return row.leftStats > 0 || row.rightStats > 0;
      }).map(function(row){
         row.statName = fromCamelCase(row.statName);
         return row;
      });

      console.log($scope.statTableRows);
   }

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

lolApp.directive('championList', function(){
   return {
      restrict: 'E',
      template:'<div ng-show="showSummoner">'+
                  '<hr>Select a Champion:'+
                  '<div ng-repeat="champion in champions|orderBy:\'name\'">'+
                     '<h4 ng-click="updateStatCompareData(champion)">{{champion.name}}</h4>'+//don't need {{}}???
                  '</div>'+
               '</div>'
   }
})




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
      $scope.champions = data.champions;
      $scope.showSummoner = true;
      console.log(data);
   })
   .error(function(data, status, headers, config){
      $scope.showSummoner = false;
      console.log('faku in get ranked stats');
   });

}

function fromCamelCase(string){

   return string[0].toUpperCase() + 
      string.substring(1, string.length)
         .replace(/[A-Z]/g, function(match){return ' ' + match.toLowerCase();})

}




