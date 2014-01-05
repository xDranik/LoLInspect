var app = angular.module('app.controllers', []);

/*
   LeftSummonerSearchCtrl is responsible for the left columns...
   - Summoner search form
   - Summoner info display
   - Success/Error messages (nodifications?)
   - List of selected champions
   ..and being super awesome
*/
app.controller('LeftSummonerSearchCtrl', function($scope, $http, RiotApiService, LeftSummonerDataService){

   $scope.toggleSelectedChampionList = function(){

      //switch to opposite option
      $scope.showOrHideSelectedChampions = 
         $scope.showOrHideSelectedChampions == 'hide' ? 'show' : 'hide';

      $('#'+$scope.summonerColor+'-list').slideToggle();
   }

   $scope.querySummoner = function(){
      RiotApiService.getSummonerInfoFromName($scope, $http);
   }

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];

   $scope.success = {show:false, message: 'Search Successfull'};
   $scope.failure = {show:false, message: 'Incorrect Info'};

   $scope.summonerColor = 'Blue';

   $scope.summonerData = LeftSummonerDataService;

   $scope.showOrHideSelectedChampions = 'hide';

});

/*
   RightSummonerSearchCtrl is responsible for the right columns...
   - Summoner search form
   - Summoner info display
   - Success/Error messages (nodifications?)
   - List of selected champions
   ..and being super awesome
*/
app.controller('RightSummonerSearchCtrl', function($scope, $http, RiotApiService, RightSummonerDataService){

   $scope.toggleSelectedChampionList = function(){

      //switch to opposite option
      $scope.showOrHideSelectedChampions = 
         $scope.showOrHideSelectedChampions == 'hide' ? 'show' : 'hide';

      $('#'+$scope.summonerColor+'-list').slideToggle();
   }

   $scope.querySummoner = function(){
      RiotApiService.getSummonerInfoFromName($scope, $http);
   }

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   $scope.success = {show:false, message: 'Search Successfull'};
   $scope.failure = {show:false, message: 'Incorrect Info'};

   $scope.summonerColor = 'Red';

   $scope.summonerData = RightSummonerDataService;

   $scope.showOrHideSelectedChampions = 'hide';

});


/*
   MainCtrl is responsible for the center columns...
   - Champion list display
   - Champion selections for both sides (blue and red)
   - Sharing top secret information with LeftSummonerDataService and RightSummonerDataService (haha)
*/
app.controller('MainCtrl', function($scope, LeftSummonerDataService, RightSummonerDataService){

   $scope.fromCamelCase = function(string){
      return string[0].toUpperCase() + 
         string.substring(1, string.length)
            .replace(/[A-Z]/g, function(match){return ' ' + match;})
   }

   $scope.selectChampion = function(champName){

      var summonerData = ($scope.radioColor == 'Blue') ? $scope.leftSummonerData : $scope.rightSummonerData;
      var nameIndex = summonerData.selectedChampions.indexOf(champName);

      if(nameIndex == -1){
         summonerData.selectedChampions.push(champName);
      }
      else{
         summonerData.selectedChampions.splice(nameIndex, 1);
      }

      summonerData.selectedChampions = summonerData.selectedChampions.sort();

      $('#'+champName).toggleClass('selected-'+$scope.radioColor);

      console.log(summonerData.selectedChampions);
   }

   $scope.nameMatches = function(searchName, champName){
      var regexp = new RegExp('^.*' + searchName + '.*$', 'i');
      return champName.match(regexp)==null?false:true;
   }

   //get this info from Riot's api!
   $scope.championNames = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", 
      "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Chogath", "Corki", "Darius", 
      "Diana", "Draven", "DrMundo", "Elise", "Evelynn", "Ezreal", "FiddleSticks", "Fiora", 
      "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", 
      "Irelia", "Janna", "JarvanIV", "Jax", "Jayce", "Jinx", "Karma", "Karthus", "Kassadin", 
      "Katarina", "Kayle", "Kennen", "Khazix", "KogMaw", "Leblanc", "LeeSin", "Leona", "Lissandra", 
      "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "MissFortune", 
      "MonkeyKing", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Nidalee", "Nocturne", 
      "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Quinn", "Rammus", "Renekton", "Rengar", 
      "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", 
      "Sona", "Soraka", "Swain", "Syndra", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", 
      "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vi", "Viktor", 
      "Vladimir", "Volibear", "Warwick", "Xerath", "XinZhao", "Yasuo", "Yorick", "Zac", "Zed", "Ziggs", 
      "Zilean", "Zyra"];
   $scope.spacedChampionNames = $scope.championNames.map(function(name){
      return $scope.fromCamelCase(name);
   });

   $scope.championSearchName = '';

   $scope.leftSummonerData = LeftSummonerDataService;
   $scope.rightSummonerData = RightSummonerDataService;

   $scope.radioColor = 'Blue';


   $scope.$watch('radioColor', function(currVal, oldVal){

      //If radio button changed...switch all the colors!!
      if(currVal != oldVal){

         var oldSelectedChampions, currSelectedChampions;

         if(oldVal == 'Blue'){
            oldSelectedChampions = $scope.leftSummonerData.selectedChampions;
            currSelectedChampions = $scope.rightSummonerData.selectedChampions;
         }
         else{
            oldSelectedChampions = $scope.rightSummonerData.selectedChampions;
            currSelectedChampions = $scope.leftSummonerData.selectedChampions;
         }

         for(var i=0; i<oldSelectedChampions.length; i++){
            $('#'+oldSelectedChampions[i]).removeClass('selected-'+oldVal);
         }
         for(var i=0; i<currSelectedChampions.length; i++){
            $('#'+currSelectedChampions[i]).addClass('selected-'+currVal);
         }

      }

   });

});