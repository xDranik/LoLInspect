var app = angular.module('app.controllers', [])

//Controller responsible for the left column on the page
app.controller('LeftSummonerCtrl', function($scope, $http, StatCompareService, RiotApiService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   //List of champions a specific summoner has played during season 3 ranked
   $scope.champions = [];


   $scope.querySummoner = function(){
      //Reset display name b/c a new (or same) summoner name is being searched
      StatCompareService.leftChampionData = {displayName: '?'};

      RiotApiService.getSummonerIdFromName($scope, $http);
   }

   //Provides updated data to the Comparison Controller in order to compare stats
   $scope.updateStatCompareData = function(champion){
      $scope.championFilter = champion.name;

      //Include summoner name with champion name to eliminate confusion
      champion.displayName = champion.name + ' (' + $scope.summonerName + ')';

      StatCompareService.leftChampionData = champion;
      console.log(StatCompareService);

      $scope.showChampionList = false;
   }

});

//Controller responsible for the right column on the page
app.controller('RightSummonerCtrl', function($scope, $http, StatCompareService, RiotApiService){

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   //List of champions a specific summoner has played during season 3 ranked
   $scope.champions = [];

   $scope.querySummoner = function(){
      //Reset display name b/c a new (or same) summoner name is being searched
      StatCompareService.rightChampionData = {displayName: '?'};

      RiotApiService.getSummonerIdFromName($scope, $http);
   }

   //Provides updated data to the Comparison Controller in order to compare stats
   $scope.updateStatCompareData = function(champion){
      $scope.championFilter = champion.name;

      //Include summoner name with champion name to eliminate confusion
      champion.displayName = champion.name + ' (' + $scope.summonerName + ')';

      StatCompareService.rightChampionData = champion;
      console.log(StatCompareService);

      $scope.showChampionList = false;
   }

});

//Controller responsible for stat comparison related tasks
app.controller('ComparisonCtrl', function($scope, StatCompareService){

   $scope.championData = StatCompareService;
   $scope.statTableRows = [];

   //Remove stats of previously chosen champions when a new champion is selected
   $scope.$watch('championData', function(){
      $scope.statTableRows = [];
   }, true);

   $scope.compareStats = function(){

      if($scope.championData.leftChampionData.displayName == '?' || 
         $scope.championData.rightChampionData.displayName == '?'){
         //At least one champion hasn't been selected. Display error message?
         return;
      }

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

         tmpStatTableRows.push({
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
         });

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
   };
});

function fromCamelCase(string){
   return string[0].toUpperCase() + 
      string.substring(1, string.length)
         .replace(/[A-Z]/g, function(match){return ' ' + match.toLowerCase();})
}