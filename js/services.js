var app = angular.module('app.services', []);

/*
   The StatCompareService factory will be used to share data
   between the Left/Right Summoner controllers and the
   stat comparison controller.
*/

//REMOVE?
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

   riotApiService.getSummonerInfoFromName = function($scope, $http){

      var region = $scope.region.toLowerCase();
      var summonerName = $scope.summonerName || '';

      /*
         -  error if summoner name doesn't meet Riot's name requirement
            to reduce API hits

         -  Cache results!
      */

      $http({
         method: 'GET', 
         url: 'http://prod.api.pvp.net/api/lol/'+region+'/v1.2/summoner/by-name/'+
               summonerName+'?api_key='+apikey
      })
      .success(function(data, status, headers, config){

         console.log(data);

         if(data.summonerLevel < 30){
            $scope.success.show = false;

            $scope.failure.message = 'Requires level 30';
            $scope.failure.show = true;
            return;
         }

         $scope.summonerInfo = data;
         riotApiService.getSummonerRankedStats($scope, $http, data.id)

      })
      .error(function(data, status, headers, config){
         
         console.log('Error on GET to /api/lol/'+ $scope.region +
            'v1.2/summoner/by-name/' + summonerName);
         console.log('HTTP status code: ' + status);

         $scope.success.show = false;
         $scope.failure.message = 'Invalid Summoner';
         $scope.failure.show = true;

         $scope.summonerInfo = undefined;
         $scope.summonerChampionData = undefined;

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

         console.log(data);
         $scope.summonerChampionData = data.champions;

         $scope.failure.show = false;
         $scope.success.show = true;

      })
      .error(function(data, status, headers, config){

         console.log('Unable to retrieve ranked stats');
         //Do level 30 summoners error out if they haven't played ranked?

         $scope.success.show = false;
         $scope.failure.show = true;

         $scope.summonerInfo = undefined;
         $scope.summonerChampionData = undefined;
         
      });
   };

   return riotApiService;
});