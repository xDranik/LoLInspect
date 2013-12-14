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
});

lolApp.controller('StatComparisonCtrl', function($scope){
   //todo
});