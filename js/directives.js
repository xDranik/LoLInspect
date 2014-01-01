var app = angular.module('app.directives', []);

app.directive('summonerForm', function(){
   return {
      restrict: 'E',
      template:'<form role="form" ng-submit=querySummoner()>'+
                  '<div class="col-xs-12">'+
                     '<h3>Summoner Search</h3>'+
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
});

app.directive('championList', function(){
   return {
      restrict: 'E',
      template:'<div class="col-xs-12" ng-show="showSummoner">'+
                  '<hr><p>Select a Champion:</p>'+
                  '<input type="text" class="form-control" placeholder="Champion search" '+
                     'ng-model="championFilter" ng-focus="showChampionList=true;">'+
                  '<table class="table table-bordered" ng-show="showChampionList">'+
                     '<tr ng-repeat="champion in champions|filter:championFilter|orderBy:\'name\'|slice:0:10:championFilter" '+
                        'ng-click="updateStatCompareData(champion)">'+
                        '<td class="cursor-pointer">{{champion.name}}</td>'+
                     '</tr>'+
                  '</table>'+
               '</div>'
   };
});