var app = angular.module('app.directives', []);

app.directive('summonerForm', function(){
   return {
      restrict: 'E',
      templateUrl: '../html/partials/directives/summoner_form.html'
   };
});

app.directive('championList', function(){
   return {
      restrict: 'E',
      templateUrl: '../html/partials/directives/champ_list.html'
   };
});

app.directive('statComparison', function(){
   return {
      restrict: 'E',
      templateUrl: '../html/partials/directives/stat_comp.html'
   };
});