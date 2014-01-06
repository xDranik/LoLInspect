var app = angular.module('app.controllers', []);

/*
   LeftSummonerSearchCtrl is responsible for the left sides...
   - Summoner search form
   - Summoner info display
   - Success/Error messages (nodifications?)
   - List of selected champions
   ..and being more awesome than the RightSummonerSearchCtrl
*/
app.controller('LeftSummonerSearchCtrl', function($scope, $http, $timeout, RiotApiService, LeftSummonerDataService){

   $scope.fromCamelCase = function(string){
      if(string == 'FiddleSticks') return 'Fiddlesticks';
      if(string == 'JarvanIV') return 'Jarvan IV';
      if(string == 'DrMundo') return 'Dr. Mundo';

      return string[0].toUpperCase() + 
         string.substring(1, string.length)
            .replace(/[A-Z]/g, function(match){return ' ' + match;})
   }

   $scope.toggleSelectedChampionList = function(){

      //switch to opposite option
      $scope.showOrHideSelectedChampions = 
         $scope.showOrHideSelectedChampions == 'hide' ? 'show' : 'hide';

      $('#'+$scope.summonerColor+'-list').slideToggle();
   }

   $scope.querySummoner = function(){
      RiotApiService.getSummonerInfoFromName($scope, $http, $timeout);
   }

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];

   $scope.success = {show:false, message: 'Search Successfull'};
   $scope.failure = {show:false, message: 'Incorrect Info'};

   $scope.summonerColor = 'Blue';

   $scope.showOrHideSelectedChampions = 'hide';

   $scope.summonerData = LeftSummonerDataService;

});

/*
   RightSummonerSearchCtrl is responsible for the right sides...
   - Summoner search form
   - Summoner info display
   - Success/Error messages (nodifications?)
   - List of selected champions
   ..and being more awesome than the LeftSummonerSearchCtrl
*/
app.controller('RightSummonerSearchCtrl', function($scope, $http, $timeout, RiotApiService, RightSummonerDataService){

   $scope.fromCamelCase = function(string){
      if(string == 'FiddleSticks') return 'Fiddlesticks';
      if(string == 'JarvanIV') return 'Jarvan IV';
      if(string == 'DrMundo') return 'Dr. Mundo';

      return string[0].toUpperCase() + 
         string.substring(1, string.length)
            .replace(/[A-Z]/g, function(match){return ' ' + match;})
   }

   $scope.toggleSelectedChampionList = function(){

      //switch to opposite option
      $scope.showOrHideSelectedChampions = 
         $scope.showOrHideSelectedChampions == 'hide' ? 'show' : 'hide';

      $('#'+$scope.summonerColor+'-list').slideToggle();
   }

   $scope.querySummoner = function(){
      RiotApiService.getSummonerInfoFromName($scope, $http, $timeout);
   }

   $scope.regions = ['NA', 'EUW', 'EUNE'];
   $scope.region = $scope.regions[0];
   $scope.showSummoner = false;

   $scope.success = {show:false, message: 'Search Successfull'};
   $scope.failure = {show:false, message: 'Incorrect Info'};

   $scope.summonerColor = 'Red';

   $scope.showOrHideSelectedChampions = 'hide';

   $scope.summonerData = RightSummonerDataService;

});


/*
   MainCtrl is responsible for the center columns...
   - Champion list display
   - Champion selections for both sides (blue and red)
   - Sharing top secret information with LeftSummonerDataService and RightSummonerDataService (haha)
*/
app.controller('MainCtrl', function($scope, LeftSummonerDataService, RightSummonerDataService){

   //Think about seperate controllers for stat comp and champ select

   $scope.fromCamelCase = function(string){
      if(string == 'FiddleSticks') return 'Fiddlesticks';
      if(string == 'JarvanIV') return 'Jarvan IV';
      if(string == 'DrMundo') return 'Dr. Mundo';

      return string[0].toUpperCase() + 
         string.substring(1, string.length)
            .replace(/[A-Z]/g, function(match){return ' ' + match;})
   }

   $scope.selectChampion = function(champName){

      //Grab data from the side that's in control (left radio = Blue, right radio = Red)
      var summonerData = ($scope.radioColor == 'Blue') ? $scope.leftSummonerData : $scope.rightSummonerData;
      var nameIndex = summonerData.selectedChampions.indexOf(champName);

      if(nameIndex == -1){
         //Selected champion isn't in the list, so add it
         summonerData.selectedChampions.push(champName);
      }
      else{
         //Selected champion is in the list, so remove it
         summonerData.selectedChampions.splice(nameIndex, 1);
      }

      summonerData.selectedChampions = summonerData.selectedChampions.sort();

      $('#'+champName).toggleClass('selected-'+$scope.radioColor);
   }

   $scope.nameMatches = function(searchName, champName){
      searchName = searchName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      var regexp = new RegExp('^.*' + searchName + '.*$', 'i');
      return champName.match(regexp)==null?false:true;
   }

   //get this info from Riot's api! Keep for now to decrease API calls
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

   $scope.championSearchName = '';

   $scope.leftSummonerData = LeftSummonerDataService;
   $scope.rightSummonerData = RightSummonerDataService;

   $scope.radioColor = 'Blue';

   $scope.statComparisonTableRows = [];

   $scope.showStatCompareTable = false;

   /*
      Swap the champions highlighted by the old side with
      the champions highlighted by the current side 
      (fired on radio button change)
   */
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


   $scope.compareStats = function(){

      // $scope.statComparisonTableRows = [{"left":{"leftStatSum":36,"color":"green","icon":"arrow-up"},"statName":"totalSessionsPlayed","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":17,"color":"green","icon":"arrow-up"},"statName":"totalSessionsLost","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":19,"color":"green","icon":"arrow-up"},"statName":"totalSessionsWon","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":35,"color":"green","icon":"arrow-up"},"statName":"totalChampionKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":972895,"color":"green","icon":"arrow-up"},"statName":"totalDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":864959,"color":"green","icon":"arrow-up"},"statName":"totalDamageTaken","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":3,"color":"green","icon":"arrow-up"},"statName":"mostChampionKillsPerSession","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":898,"color":"green","icon":"arrow-up"},"statName":"totalMinionKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalDoubleKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalTripleKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalQuadraKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalPentaKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalUnrealKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":314762,"color":"green","icon":"arrow-up"},"statName":"totalGoldEarned","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"mostSpellsCast","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":15,"color":"green","icon":"arrow-up"},"statName":"totalTurretsKilled","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":258861,"color":"green","icon":"arrow-up"},"statName":"totalPhysicalDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":713319,"color":"green","icon":"arrow-up"},"statName":"totalMagicDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalFirstBlood","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":501,"color":"green","icon":"arrow-up"},"statName":"totalAssists","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":3,"color":"green","icon":"arrow-up"},"statName":"maxChampionsKilled","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}}] 

      //If one of the sides does NOT have a valid summoner...
      if($scope.leftSummonerData.championDataFromApi == undefined ||
         $scope.rightSummonerData.championDataFromApi == undefined){

         //Display error message

         return;
      }

      /*
         Compare data of only the selected champions for both sides.
         Array.prototype.filter makes a copy of the array, so the data
         is not thrown away
      */
      var leftChampionDataFromApi = $scope.leftSummonerData.championDataFromApi
            .filter(function(championObj){
               return $scope.leftSummonerData.selectedChampions
                  .indexOf(championObj.name) != -1;
            });

      var rightChampionDataFromApi = $scope.rightSummonerData.championDataFromApi
         .filter(function(championObj){
            return $scope.rightSummonerData.selectedChampions
               .indexOf(championObj.name) != -1;
         });

      var leftSum, rightSum, tableRows = [], statNames;

      //Color and icon info for glyphicons in stat comparison table
      var leftIcon = {color: 'Orange', icon: 'minus'}, 
          rightIcon = {color: 'Orange', icon: 'minus'};

      //Get stat names from champion object
      var statNames = Object.keys($scope.leftSummonerData.championDataFromApi[0].stats);

      //Initial stat sum array full of 0's
      var leftStatSums = [], rightStatSums = [];
      for(var i=0; i<statNames.length; i++){
         leftStatSums[i] = 0;
         rightStatSums[i] = 0;
      }

      var index;
      //Sum all champion stats for left side summoner
      for(var i=0; i<leftChampionDataFromApi.length; i++){

         index = 0;
         //Add champion stats to overall sum
         for(var stat in leftChampionDataFromApi[i].stats){
            leftStatSums[index++] += leftChampionDataFromApi[i].stats[stat];
         }
         
      }

      //Sum all champion stats for right side summoner
      for(var i=0; i<rightChampionDataFromApi.length; i++){

         index = 0;
         //Add champion stats to overall sum
         for(var stat in rightChampionDataFromApi[i].stats){
            rightStatSums[index++] += rightChampionDataFromApi[i].stats[stat];
         }
      }

      var difference;
      for(var i=0; i<statNames.length; i++){

         difference = leftStatSums[i] - rightStatSums[i];

         //Change glyphicon color and icon depending on stat difference
         if(difference < 0){
            leftIcon = {color: 'Red', icon: 'arrow-down'};
            rightIcon = {color: 'Blue', icon: 'arrow-up'};
         } 
         else if(difference > 0){
            leftIcon = {color: 'Blue', icon: 'arrow-up'};
            rightIcon = {color: 'Red', icon: 'arrow-down'};
         }

         tableRows.push({
            left: {
               leftStatSum: leftStatSums[i],
               color: leftIcon.color,
               icon: leftIcon.icon
            },
            statName: statNames[i],
            right: {
               rightStatSum: rightStatSums[i],
               color: rightIcon.color,
               icon: rightIcon.icon
            }
         });

      }

      $scope.statComparisonTableRows = tableRows;
      $scope.showStatCompareTable = true;
   }

});