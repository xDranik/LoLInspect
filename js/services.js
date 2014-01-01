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