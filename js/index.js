var lolApp = angular.module('lolApp', []);

/*
   The StatCompareService factory will be used to share data
   between the Left/Right Summoner controllers and the
   stat comparison controller.
*/
lolApp.factory('StatCompareService', function(){
   return {
      leftChampionData: {displayName: '?'},
      rightChampionData: {displayName: '?'},
      comparisonData: undefined
   }
});

//Controller responsible for the left column on the page
lolApp.controller('LeftSummonerCtrl', function($scope, $http, StatCompareService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   //List of champions a specific summoner has played during 2013 ranked
   $scope.champions = [];


   $scope.querySummoner = function(){
      //Reset display name b/c a new (or same) summoner name is being searched
      StatCompareService.leftChampionData = {displayName: '?'};

      getSummonerIDFromName($scope, $http);//Create a service instead of using below functions
   }

   //Provides updated data to the Comparison Controller in order to compare stats
   $scope.updateStatCompareData = function(champion){
      //Include summoner name with champion name to eliminate confusion
      champion.displayName = champion.name + ' (' + $scope.summonerName + ')';

      StatCompareService.leftChampionData = champion;
      console.log(StatCompareService);
   }

});

//Controller responsible for the right column on the page
lolApp.controller('RightSummonerCtrl', function($scope, $http, StatCompareService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   //List of champions a specific summoner has played during 2013 ranked
   $scope.champions = [];

   $scope.querySummoner = function(){
      //Reset display name b/c a new (or same) summoner name is being searched
      StatCompareService.rightChampionData = {displayName: '?'};

      getSummonerIDFromName($scope, $http);//Create a service instead of using below functions
   }

   //Provides updated data to the Comparison Controller in order to compare stats
   $scope.updateStatCompareData = function(champion){
      //Include summoner name with champion name to eliminate confusion
      champion.displayName = champion.name + ' (' + $scope.summonerName + ')';

      StatCompareService.rightChampionData = champion;
      console.log(StatCompareService);
   }

});

//Controller responsible for stat comparison related tasks
lolApp.controller('ComparisonCtrl', function($scope, StatCompareService){

   $scope.championData = StatCompareService;
   $scope.statTableRows = [];

   //Remove stats of previously chosen champions when a new champion is selected
   $scope.$watch('championData', function(){
      $scope.statTableRows = [];
   }, true);

   $scope.compareStats = function(){

      $scope.statTableRows = [];
      var tmpStatTableRows = [];

      var leftIcon = {color: 'orange', icon: 'minus'}, 
          rightIcon = {color: 'orange', icon: 'minus'};
      var difference;

      for(var stat in StatCompareService.leftChampionData.stats){

         difference = StatCompareService.leftChampionData.stats[stat] - 
                      StatCompareService.rightChampionData.stats[stat];

         //Change icon object depending on stat difference
         if(difference < 0){
            leftIcon = {color: 'red', icon: 'arrow-down'};
            rightIcon = {color: 'green', icon: 'arrow-up'};
         } 
         else if(difference > 0){
            leftIcon = {color: 'green', icon: 'arrow-up'};
            rightIcon = {color: 'red', icon: 'arrow-down'};
         }

         tmpStatTableRows.push(
            {
               left: {
                  stats: StatCompareService.leftChampionData.stats[stat],
                  color: leftIcon.color,
                  icon: leftIcon.icon
               },
               statName: stat,
               right: {
                  stats: StatCompareService.rightChampionData.stats[stat],
                  color: rightIcon.color,
                  icon: rightIcon.icon
               }
            }
         );

      }

      //Filter out stats that are 0 for both of the selected champions
      $scope.statTableRows = tmpStatTableRows.filter(function(row){
         return row.left.stats > 0 || row.right.stats > 0;
      })
      //Change camel cased stat names to space seperated
      .map(function(row){
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
                  '<div class="col-xs-12">'+
                     '<p>Summoner Search</p>'+
                     '<input type="text" class="form-control" placeholder="Summoner Name" ng-model="summonerName">'+
                  '</div>'+
                  '<div class="col-xs-5 margin-top-10">'+
                     '<select class="form-control" ng-model="region" ng-options="r.toString() for r in regions">'+
                     '</select>'+
                  '</div>'+
                  '<button type="submit" class="btn btn-primary margin-top-10">'+
                     '<span class="glyphicon glyphicon-search"></span> Search'+
                  '</button>'+
               '</form>'
   }
})

lolApp.directive('championList', function(){
   return {
      restrict: 'E',
      template:'<div ng-show="showSummoner">'+
                  '<hr>Select a Champion:'+
                  '<div>'+
                     '<h4 ng-repeat="champion in champions|orderBy:\'name\'" '+
                        'ng-click="updateStatCompareData(champion)">{{champion.name}}'+
                     '</h4>'+
                  '</div>'+
               '</div>'
   }
})




function getSummonerIDFromName($scope, $http){
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
      summonerID+'/ranked?season=SEASON3&api_key='+apikey
   })
   .success(function(data, status, headers, config){
      $scope.champions = data.champions;
      $scope.showSummoner = true;
      console.log(data);
   })
   .error(function(data, status, headers, config){
      $scope.showSummoner = false;
      console.log('Unable to retrieve ranked stats');
   });
}

function fromCamelCase(string){

   return string[0].toUpperCase() + 
      string.substring(1, string.length)
         .replace(/[A-Z]/g, function(match){return ' ' + match.toLowerCase();})
}




