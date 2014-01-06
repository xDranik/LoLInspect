var app = angular.module('app.services', []);

/*
   The RiotApiService factory is in charge of handling any API
   requests to Riot's API. Include anything that requires consuming
   Riot's API.
*/
app.factory('RiotApiService', function(){
   var riotApiService = {};

   /*
      Retrieves a summoners level and ID, given their summoner name.
      The ID is used in riotApiService.getSummonerRankedStats to retrieve
      a summoners champion data
   */
   riotApiService.getSummonerInfoFromName = function($scope, $http, $timeout){

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

         //Level < 30 don't have ranked stats
         if(data.summonerLevel < 30){
            $scope.success.show = false;

            $scope.failure.message = 'Requires level 30';
            $scope.failure.show = true;

            $scope.summonerData.summonerInfo.name = undefined;
            $scope.summonerData.summonerInfo.level = undefined;
            $scope.summonerData.championDataFromApi = undefined;
            return;
         }

         $scope.summonerData.summonerInfo.name = data.name;
         $scope.summonerData.summonerInfo.level = data.summonerLevel;

         riotApiService.getSummonerRankedStats($scope, $http, data.id, $timeout)

      })
      .error(function(data, status, headers, config){
         
         console.log('Error on GET to /api/lol/'+ $scope.region +
            'v1.2/summoner/by-name/' + summonerName);
         console.log('HTTP status code: ' + status);

         $scope.success.show = false;
         $scope.failure.message = 'Incorrect Info';
         $scope.failure.show = true;

         $scope.summonerData.summonerInfo.name = undefined;
         $scope.summonerData.summonerInfo.level = undefined;
         $scope.summonerData.championDataFromApi = undefined;

      });
   };

   /*
      Retrieves a summoners champion data given their summonerID.
   */
   riotApiService.getSummonerRankedStats = function($scope, $http, summonerID, $timeout){

      $http({
         method: 'GET',
         url: 'http://prod.api.pvp.net/api/lol/' + $scope.region.toLowerCase()
            +'/v1.2/stats/by-summoner/' + summonerID + '/ranked?season=SEASON3&api_key=' + apikey
      })
      .success(function(data, status, headers, config){

         console.log(data);
         $scope.summonerData.championDataFromApi = data.champions;

         $scope.failure.show = false;
         $scope.success.show = true;

         //Hide notification after 3 seconds
         $timeout(function(){
            $scope.success.show = false;
         }, 3000);

      })
      .error(function(data, status, headers, config){

         console.log('Error on GET to /api/lol/'+ $scope.region.toLowerCase() +
            'v1.2/summoner/by-name/' + summonerName);
         console.log('HTTP status code: ' + status);
         //Do level 30 summoners error out if they haven't played ranked?

         $scope.success.show = false;
         $scope.failure.show = true;

         $scope.summonerData.summonerInfo.name = undefined;
         $scope.summonerData.summonerInfo.level = undefined;
         $scope.summonerData.championDataFromApi = undefined;
         
      });
   };

   return riotApiService;
});



/*
   LeftSummonerDataService is used to share data between
   LeftSummonerSearchCtrl and MainCtrl
*/
app.factory('LeftSummonerDataService', function(){

   return{
      summonerInfo:{
         name: undefined,
         level: undefined
      },
      selectedChampions: [],
      championDataFromApi: undefined
   };

});

/*
   RightSummonerDataService is used to share data between
   RightSummonerSearchCtrl and MainCtrl
*/
app.factory('RightSummonerDataService', function(){

   return{
      summonerInfo:{
         name: undefined,
         level: undefined
      },
      selectedChampions: [],
      championDataFromApi: undefined
   };

});