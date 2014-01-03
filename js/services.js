var app = angular.module('app.services', []);

/*
   The StatCompareService factory will be used to share data
   between the Left/Right Summoner controllers and the
   stat comparison controller.
*/
app.factory('StatCompareService', function(){
   return {
      leftChampionData: {displayName: '?'},
      rightChampionData: {displayName: '?'},
      comparisonData: undefined
   }
});

/*
   The RiotApiService factory is in charge of handling any API
   requests to Riot's API. Include anything that requires consuming
   Riot's API.
*/
app.factory('RiotApiService', function(){
   var riotApiService = {};

   riotApiService.getSummonerIdFromName = function($scope, $http){
      var region = $scope.region.toLowerCase();
      var summonerName = $scope.summonerName || '';

      if(summonerName.length < 3 || summonerName.length > 16){
         $scope.showSummoner = false;
         return;
      }

      $http({
         method: 'GET', 
         url: 'http://prod.api.pvp.net/api/lol/'+region+'/v1.2/summoner/by-name/'+
               summonerName+'?api_key='+apikey
      })
      .success(function(data, status, headers, config){

         console.log(data);
         riotApiService.getSummonerRankedStats($scope, $http, data.id)

      })
      .error(function(data, status, headers, config){//DISPLAY ERROR MESSAGE?
         
         $scope.showSummoner = false;
         console.log('Error on GET to /api/lol/'+ $scope.region +
            'v1.2/summoner/by-name/' + summonerName);
         console.log('HTTP status code: ' + status);

      });
   };

   riotApiService.getSummonerRankedStats = function($scope, $http, summonerID){

      var region = $scope.region.toLowerCase();
      $http({
         method: 'GET',
         url: 'http://prod.api.pvp.net/api/lol/'+region+'/v1.2/stats/by-summoner/' +
         summonerID+'/ranked?season=SEASON3&api_key='+apikey
      })
      .success(function(data, status, headers, config){
         $scope.champions = data.champions;
         $scope.showSummoner = true;
         console.log(data);
      })
      .error(function(data, status, headers, config){//DISPLAY ERROR MESSAGE?
         $scope.showSummoner = false;
         console.log('Unable to retrieve ranked stats');
      });
   };

   return riotApiService;
});