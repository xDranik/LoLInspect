var lolApp = angular.module('lolApp', []);

lolApp.controller('MainCtrl', function($scope){
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