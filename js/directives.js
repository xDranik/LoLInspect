var app = angular.module('app.directives', []);

app.directive('summonerForm', function(){
   return {
      restrict: 'E',
      templateUrl: '../html/partials/directives/summoner_form.html'
   }
});

app.directive('championList', function(){
   return {
      restrict: 'E',
      templateUrl: '../html/partials/directives/champion_list.html'
   };
});