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

   // $scope.showStatCompareTable = false;
   $scope.showStatCompareTable = true;



   $scope.leftSummonerData.championDataFromApi = [{"id":40,"name":"Janna","stats":{"totalSessionsPlayed":45,"totalSessionsLost":19,"totalSessionsWon":26,"totalChampionKills":51,"totalDamageDealt":930680,"totalDamageTaken":624095,"mostChampionKillsPerSession":7,"totalMinionKills":810,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":357002,"mostSpellsCast":0,"totalTurretsKilled":17,"totalPhysicalDamageDealt":360157,"totalMagicDamageDealt":566558,"totalFirstBlood":0,"totalAssists":666,"maxChampionsKilled":7}},{"id":75,"name":"Nasus","stats":{"totalSessionsPlayed":1,"totalSessionsLost":0,"totalSessionsWon":1,"totalChampionKills":3,"totalDamageDealt":91940,"totalDamageTaken":27496,"mostChampionKillsPerSession":3,"totalMinionKills":62,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":8562,"mostSpellsCast":0,"totalTurretsKilled":1,"totalPhysicalDamageDealt":29570,"totalMagicDamageDealt":55913,"totalFirstBlood":0,"totalAssists":8,"maxChampionsKilled":3}},{"id":76,"name":"Nidalee","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":10,"totalDamageDealt":271749,"totalDamageTaken":41238,"mostChampionKillsPerSession":5,"totalMinionKills":393,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":21837,"mostSpellsCast":0,"totalTurretsKilled":7,"totalPhysicalDamageDealt":182690,"totalMagicDamageDealt":87897,"totalFirstBlood":0,"totalAssists":7,"maxChampionsKilled":5}},{"id":143,"name":"Zyra","stats":{"totalSessionsPlayed":15,"totalSessionsLost":6,"totalSessionsWon":9,"totalChampionKills":64,"totalDamageDealt":1117275,"totalDamageTaken":265363,"mostChampionKillsPerSession":13,"totalMinionKills":1055,"totalDoubleKills":4,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":154383,"mostSpellsCast":0,"totalTurretsKilled":14,"totalPhysicalDamageDealt":186451,"totalMagicDamageDealt":880620,"totalFirstBlood":0,"totalAssists":182,"maxChampionsKilled":13}},{"id":37,"name":"Sona","stats":{"totalSessionsPlayed":38,"totalSessionsLost":13,"totalSessionsWon":25,"totalChampionKills":66,"totalDamageDealt":1059346,"totalDamageTaken":555938,"mostChampionKillsPerSession":6,"totalMinionKills":896,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":307147,"mostSpellsCast":0,"totalTurretsKilled":19,"totalPhysicalDamageDealt":360855,"totalMagicDamageDealt":694358,"totalFirstBlood":0,"totalAssists":547,"maxChampionsKilled":6}},{"id":117,"name":"Lulu","stats":{"totalSessionsPlayed":26,"totalSessionsLost":17,"totalSessionsWon":9,"totalChampionKills":43,"totalDamageDealt":762386,"totalDamageTaken":433513,"mostChampionKillsPerSession":4,"totalMinionKills":803,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":198206,"mostSpellsCast":0,"totalTurretsKilled":7,"totalPhysicalDamageDealt":215239,"totalMagicDamageDealt":538026,"totalFirstBlood":0,"totalAssists":318,"maxChampionsKilled":4}},{"id":103,"name":"Ahri","stats":{"totalSessionsPlayed":3,"totalSessionsLost":3,"totalSessionsWon":0,"totalChampionKills":11,"totalDamageDealt":318384,"totalDamageTaken":61281,"mostChampionKillsPerSession":5,"totalMinionKills":394,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":27948,"mostSpellsCast":0,"totalTurretsKilled":3,"totalPhysicalDamageDealt":54584,"totalMagicDamageDealt":174653,"totalFirstBlood":0,"totalAssists":30,"maxChampionsKilled":5}},{"id":51,"name":"Caitlyn","stats":{"totalSessionsPlayed":26,"totalSessionsLost":11,"totalSessionsWon":15,"totalChampionKills":155,"totalDamageDealt":4334983,"totalDamageTaken":462765,"mostChampionKillsPerSession":11,"totalMinionKills":5096,"totalDoubleKills":12,"totalTripleKills":2,"totalQuadraKills":1,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":314487,"mostSpellsCast":0,"totalTurretsKilled":53,"totalPhysicalDamageDealt":4176139,"totalMagicDamageDealt":135993,"totalFirstBlood":0,"totalAssists":206,"maxChampionsKilled":11}},{"id":17,"name":"Teemo","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":10,"totalDamageDealt":183403,"totalDamageTaken":30183,"mostChampionKillsPerSession":7,"totalMinionKills":364,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":18570,"mostSpellsCast":0,"totalTurretsKilled":2,"totalPhysicalDamageDealt":89696,"totalMagicDamageDealt":92014,"totalFirstBlood":0,"totalAssists":6,"maxChampionsKilled":7}},{"id":44,"name":"Taric","stats":{"totalSessionsPlayed":2,"totalSessionsLost":0,"totalSessionsWon":2,"totalChampionKills":5,"totalDamageDealt":31831,"totalDamageTaken":30212,"mostChampionKillsPerSession":3,"totalMinionKills":41,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":15621,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":12824,"totalMagicDamageDealt":13943,"totalFirstBlood":0,"totalAssists":25,"maxChampionsKilled":3}},{"id":18,"name":"Tristana","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":18,"totalDamageDealt":214865,"totalDamageTaken":31930,"mostChampionKillsPerSession":10,"totalMinionKills":292,"totalDoubleKills":5,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":21086,"mostSpellsCast":0,"totalTurretsKilled":2,"totalPhysicalDamageDealt":169124,"totalMagicDamageDealt":43807,"totalFirstBlood":0,"totalAssists":18,"maxChampionsKilled":10}},{"id":16,"name":"Soraka","stats":{"totalSessionsPlayed":3,"totalSessionsLost":1,"totalSessionsWon":2,"totalChampionKills":2,"totalDamageDealt":47298,"totalDamageTaken":30055,"mostChampionKillsPerSession":1,"totalMinionKills":57,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":19806,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":15948,"totalMagicDamageDealt":31347,"totalFirstBlood":0,"totalAssists":29,"maxChampionsKilled":1}},{"id":22,"name":"Ashe","stats":{"totalSessionsPlayed":5,"totalSessionsLost":0,"totalSessionsWon":5,"totalChampionKills":39,"totalDamageDealt":809068,"totalDamageTaken":90466,"mostChampionKillsPerSession":11,"totalMinionKills":913,"totalDoubleKills":3,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":68621,"mostSpellsCast":0,"totalTurretsKilled":11,"totalPhysicalDamageDealt":763044,"totalMagicDamageDealt":40949,"totalFirstBlood":0,"totalAssists":63,"maxChampionsKilled":11}},{"id":267,"name":"Nami","stats":{"totalSessionsPlayed":20,"totalSessionsLost":12,"totalSessionsWon":8,"totalChampionKills":20,"totalDamageDealt":331359,"totalDamageTaken":304015,"mostChampionKillsPerSession":4,"totalMinionKills":325,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":152479,"mostSpellsCast":0,"totalTurretsKilled":9,"totalPhysicalDamageDealt":156851,"totalMagicDamageDealt":171930,"totalFirstBlood":0,"totalAssists":278,"maxChampionsKilled":4}},{"id":56,"name":"Nocturne","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":3,"totalDamageDealt":87369,"totalDamageTaken":15561,"mostChampionKillsPerSession":3,"totalMinionKills":27,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":6184,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":69305,"totalMagicDamageDealt":5203,"totalFirstBlood":0,"totalAssists":1,"maxChampionsKilled":3}},{"id":19,"name":"Warwick","stats":{"totalSessionsPlayed":4,"totalSessionsLost":0,"totalSessionsWon":4,"totalChampionKills":33,"totalDamageDealt":363916,"totalDamageTaken":127237,"mostChampionKillsPerSession":14,"totalMinionKills":168,"totalDoubleKills":5,"totalTripleKills":3,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":42662,"mostSpellsCast":0,"totalTurretsKilled":11,"totalPhysicalDamageDealt":235854,"totalMagicDamageDealt":81732,"totalFirstBlood":0,"totalAssists":57,"maxChampionsKilled":14}},{"id":133,"name":"Quinn","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":6,"totalDamageDealt":85366,"totalDamageTaken":21575,"mostChampionKillsPerSession":6,"totalMinionKills":134,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":9907,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":76464,"totalMagicDamageDealt":7111,"totalFirstBlood":0,"totalAssists":6,"maxChampionsKilled":6}},{"id":23,"name":"Tryndamere","stats":{"totalSessionsPlayed":1,"totalSessionsLost":0,"totalSessionsWon":1,"totalChampionKills":9,"totalDamageDealt":269288,"totalDamageTaken":45773,"mostChampionKillsPerSession":9,"totalMinionKills":266,"totalDoubleKills":1,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":16455,"mostSpellsCast":0,"totalTurretsKilled":4,"totalPhysicalDamageDealt":232482,"totalMagicDamageDealt":34877,"totalFirstBlood":0,"totalAssists":8,"maxChampionsKilled":9}},{"id":99,"name":"Lux","stats":{"totalSessionsPlayed":16,"totalSessionsLost":7,"totalSessionsWon":9,"totalChampionKills":80,"totalDamageDealt":1673813,"totalDamageTaken":163539,"mostChampionKillsPerSession":11,"totalMinionKills":2325,"totalDoubleKills":9,"totalTripleKills":2,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":158239,"mostSpellsCast":0,"totalTurretsKilled":17,"totalPhysicalDamageDealt":300842,"totalMagicDamageDealt":1368437,"totalFirstBlood":0,"totalAssists":129,"maxChampionsKilled":11}},{"id":67,"name":"Vayne","stats":{"totalSessionsPlayed":2,"totalSessionsLost":0,"totalSessionsWon":2,"totalChampionKills":22,"totalDamageDealt":167150,"totalDamageTaken":28688,"mostChampionKillsPerSession":14,"totalMinionKills":301,"totalDoubleKills":7,"totalTripleKills":1,"totalQuadraKills":1,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":20432,"mostSpellsCast":0,"totalTurretsKilled":4,"totalPhysicalDamageDealt":152723,"totalMagicDamageDealt":776,"totalFirstBlood":0,"totalAssists":7,"maxChampionsKilled":14}},{"id":27,"name":"Singed","stats":{"totalSessionsPlayed":3,"totalSessionsLost":2,"totalSessionsWon":1,"totalChampionKills":5,"totalDamageDealt":346397,"totalDamageTaken":88459,"mostChampionKillsPerSession":4,"totalMinionKills":495,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":25700,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":21800,"totalMagicDamageDealt":319523,"totalFirstBlood":0,"totalAssists":15,"maxChampionsKilled":4}},{"id":61,"name":"Orianna","stats":{"totalSessionsPlayed":4,"totalSessionsLost":2,"totalSessionsWon":2,"totalChampionKills":17,"totalDamageDealt":414717,"totalDamageTaken":38020,"mostChampionKillsPerSession":8,"totalMinionKills":664,"totalDoubleKills":1,"totalTripleKills":1,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":37407,"mostSpellsCast":0,"totalTurretsKilled":3,"totalPhysicalDamageDealt":76270,"totalMagicDamageDealt":334999,"totalFirstBlood":0,"totalAssists":33,"maxChampionsKilled":8}},{"id":60,"name":"Elise","stats":{"totalSessionsPlayed":2,"totalSessionsLost":2,"totalSessionsWon":0,"totalChampionKills":3,"totalDamageDealt":147480,"totalDamageTaken":28170,"mostChampionKillsPerSession":2,"totalMinionKills":200,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":14018,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":54245,"totalMagicDamageDealt":86456,"totalFirstBlood":0,"totalAssists":9,"maxChampionsKilled":2}},{"id":1,"name":"Annie","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":0,"totalDamageDealt":13324,"totalDamageTaken":9213,"mostChampionKillsPerSession":0,"totalMinionKills":11,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":3577,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":2566,"totalMagicDamageDealt":10523,"totalFirstBlood":0,"totalAssists":1,"maxChampionsKilled":0}},{"id":0,"name":"Combined","stats":{"totalSessionsPlayed":225,"totalSessionsLost":101,"totalSessionsWon":124,"totalChampionKills":675,"killingSpree":367,"totalDamageDealt":14073387,"totalDamageTaken":3554785,"mostChampionKillsPerSession":14,"totalMinionKills":16092,"totalDoubleKills":53,"totalTripleKills":9,"totalQuadraKills":2,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":2020336,"mostSpellsCast":0,"totalTurretsKilled":184,"totalPhysicalDamageDealt":7995723,"totalMagicDamageDealt":5777645,"totalNeutralMinionsKilled":1333,"totalFirstBlood":0,"totalAssists":2649,"totalHeal":850529,"maxLargestKillingSpree":11,"maxLargestCriticalStrike":1516,"maxChampionsKilled":14,"maxTimePlayed":4243,"maxTimeSpentLiving":2378,"normalGamesPlayed":0,"rankedSoloGamesPlayed":0,"rankedPremadeGamesPlayed":0,"botGamesPlayed":0}}];
   $scope.rightSummonerData.championDataFromApi = [{"id":40,"name":"Janna","stats":{"totalSessionsPlayed":45,"totalSessionsLost":19,"totalSessionsWon":26,"totalChampionKills":51,"totalDamageDealt":930680,"totalDamageTaken":624095,"mostChampionKillsPerSession":7,"totalMinionKills":810,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":357002,"mostSpellsCast":0,"totalTurretsKilled":17,"totalPhysicalDamageDealt":360157,"totalMagicDamageDealt":566558,"totalFirstBlood":0,"totalAssists":666,"maxChampionsKilled":7}},{"id":75,"name":"Nasus","stats":{"totalSessionsPlayed":1,"totalSessionsLost":0,"totalSessionsWon":1,"totalChampionKills":3,"totalDamageDealt":91940,"totalDamageTaken":27496,"mostChampionKillsPerSession":3,"totalMinionKills":62,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":8562,"mostSpellsCast":0,"totalTurretsKilled":1,"totalPhysicalDamageDealt":29570,"totalMagicDamageDealt":55913,"totalFirstBlood":0,"totalAssists":8,"maxChampionsKilled":3}},{"id":76,"name":"Nidalee","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":10,"totalDamageDealt":271749,"totalDamageTaken":41238,"mostChampionKillsPerSession":5,"totalMinionKills":393,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":21837,"mostSpellsCast":0,"totalTurretsKilled":7,"totalPhysicalDamageDealt":182690,"totalMagicDamageDealt":87897,"totalFirstBlood":0,"totalAssists":7,"maxChampionsKilled":5}},{"id":143,"name":"Zyra","stats":{"totalSessionsPlayed":15,"totalSessionsLost":6,"totalSessionsWon":9,"totalChampionKills":64,"totalDamageDealt":1117275,"totalDamageTaken":265363,"mostChampionKillsPerSession":13,"totalMinionKills":1055,"totalDoubleKills":4,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":154383,"mostSpellsCast":0,"totalTurretsKilled":14,"totalPhysicalDamageDealt":186451,"totalMagicDamageDealt":880620,"totalFirstBlood":0,"totalAssists":182,"maxChampionsKilled":13}},{"id":37,"name":"Sona","stats":{"totalSessionsPlayed":38,"totalSessionsLost":13,"totalSessionsWon":25,"totalChampionKills":66,"totalDamageDealt":1059346,"totalDamageTaken":555938,"mostChampionKillsPerSession":6,"totalMinionKills":896,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":307147,"mostSpellsCast":0,"totalTurretsKilled":19,"totalPhysicalDamageDealt":360855,"totalMagicDamageDealt":694358,"totalFirstBlood":0,"totalAssists":547,"maxChampionsKilled":6}},{"id":117,"name":"Lulu","stats":{"totalSessionsPlayed":26,"totalSessionsLost":17,"totalSessionsWon":9,"totalChampionKills":43,"totalDamageDealt":762386,"totalDamageTaken":433513,"mostChampionKillsPerSession":4,"totalMinionKills":803,"totalDoubleKills":2,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":198206,"mostSpellsCast":0,"totalTurretsKilled":7,"totalPhysicalDamageDealt":215239,"totalMagicDamageDealt":538026,"totalFirstBlood":0,"totalAssists":318,"maxChampionsKilled":4}},{"id":103,"name":"Ahri","stats":{"totalSessionsPlayed":3,"totalSessionsLost":3,"totalSessionsWon":0,"totalChampionKills":11,"totalDamageDealt":318384,"totalDamageTaken":61281,"mostChampionKillsPerSession":5,"totalMinionKills":394,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":27948,"mostSpellsCast":0,"totalTurretsKilled":3,"totalPhysicalDamageDealt":54584,"totalMagicDamageDealt":174653,"totalFirstBlood":0,"totalAssists":30,"maxChampionsKilled":5}},{"id":51,"name":"Caitlyn","stats":{"totalSessionsPlayed":26,"totalSessionsLost":11,"totalSessionsWon":15,"totalChampionKills":155,"totalDamageDealt":4334983,"totalDamageTaken":462765,"mostChampionKillsPerSession":11,"totalMinionKills":5096,"totalDoubleKills":12,"totalTripleKills":2,"totalQuadraKills":1,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":314487,"mostSpellsCast":0,"totalTurretsKilled":53,"totalPhysicalDamageDealt":4176139,"totalMagicDamageDealt":135993,"totalFirstBlood":0,"totalAssists":206,"maxChampionsKilled":11}},{"id":17,"name":"Teemo","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":10,"totalDamageDealt":183403,"totalDamageTaken":30183,"mostChampionKillsPerSession":7,"totalMinionKills":364,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":18570,"mostSpellsCast":0,"totalTurretsKilled":2,"totalPhysicalDamageDealt":89696,"totalMagicDamageDealt":92014,"totalFirstBlood":0,"totalAssists":6,"maxChampionsKilled":7}},{"id":44,"name":"Taric","stats":{"totalSessionsPlayed":2,"totalSessionsLost":0,"totalSessionsWon":2,"totalChampionKills":5,"totalDamageDealt":31831,"totalDamageTaken":30212,"mostChampionKillsPerSession":3,"totalMinionKills":41,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":15621,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":12824,"totalMagicDamageDealt":13943,"totalFirstBlood":0,"totalAssists":25,"maxChampionsKilled":3}},{"id":18,"name":"Tristana","stats":{"totalSessionsPlayed":2,"totalSessionsLost":1,"totalSessionsWon":1,"totalChampionKills":18,"totalDamageDealt":214865,"totalDamageTaken":31930,"mostChampionKillsPerSession":10,"totalMinionKills":292,"totalDoubleKills":5,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":21086,"mostSpellsCast":0,"totalTurretsKilled":2,"totalPhysicalDamageDealt":169124,"totalMagicDamageDealt":43807,"totalFirstBlood":0,"totalAssists":18,"maxChampionsKilled":10}},{"id":16,"name":"Soraka","stats":{"totalSessionsPlayed":3,"totalSessionsLost":1,"totalSessionsWon":2,"totalChampionKills":2,"totalDamageDealt":47298,"totalDamageTaken":30055,"mostChampionKillsPerSession":1,"totalMinionKills":57,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":19806,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":15948,"totalMagicDamageDealt":31347,"totalFirstBlood":0,"totalAssists":29,"maxChampionsKilled":1}},{"id":22,"name":"Ashe","stats":{"totalSessionsPlayed":5,"totalSessionsLost":0,"totalSessionsWon":5,"totalChampionKills":39,"totalDamageDealt":809068,"totalDamageTaken":90466,"mostChampionKillsPerSession":11,"totalMinionKills":913,"totalDoubleKills":3,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":68621,"mostSpellsCast":0,"totalTurretsKilled":11,"totalPhysicalDamageDealt":763044,"totalMagicDamageDealt":40949,"totalFirstBlood":0,"totalAssists":63,"maxChampionsKilled":11}},{"id":267,"name":"Nami","stats":{"totalSessionsPlayed":20,"totalSessionsLost":12,"totalSessionsWon":8,"totalChampionKills":20,"totalDamageDealt":331359,"totalDamageTaken":304015,"mostChampionKillsPerSession":4,"totalMinionKills":325,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":152479,"mostSpellsCast":0,"totalTurretsKilled":9,"totalPhysicalDamageDealt":156851,"totalMagicDamageDealt":171930,"totalFirstBlood":0,"totalAssists":278,"maxChampionsKilled":4}},{"id":56,"name":"Nocturne","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":3,"totalDamageDealt":87369,"totalDamageTaken":15561,"mostChampionKillsPerSession":3,"totalMinionKills":27,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":6184,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":69305,"totalMagicDamageDealt":5203,"totalFirstBlood":0,"totalAssists":1,"maxChampionsKilled":3}},{"id":19,"name":"Warwick","stats":{"totalSessionsPlayed":4,"totalSessionsLost":0,"totalSessionsWon":4,"totalChampionKills":33,"totalDamageDealt":363916,"totalDamageTaken":127237,"mostChampionKillsPerSession":14,"totalMinionKills":168,"totalDoubleKills":5,"totalTripleKills":3,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":42662,"mostSpellsCast":0,"totalTurretsKilled":11,"totalPhysicalDamageDealt":235854,"totalMagicDamageDealt":81732,"totalFirstBlood":0,"totalAssists":57,"maxChampionsKilled":14}},{"id":133,"name":"Quinn","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":6,"totalDamageDealt":85366,"totalDamageTaken":21575,"mostChampionKillsPerSession":6,"totalMinionKills":134,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":9907,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":76464,"totalMagicDamageDealt":7111,"totalFirstBlood":0,"totalAssists":6,"maxChampionsKilled":6}},{"id":23,"name":"Tryndamere","stats":{"totalSessionsPlayed":1,"totalSessionsLost":0,"totalSessionsWon":1,"totalChampionKills":9,"totalDamageDealt":269288,"totalDamageTaken":45773,"mostChampionKillsPerSession":9,"totalMinionKills":266,"totalDoubleKills":1,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":16455,"mostSpellsCast":0,"totalTurretsKilled":4,"totalPhysicalDamageDealt":232482,"totalMagicDamageDealt":34877,"totalFirstBlood":0,"totalAssists":8,"maxChampionsKilled":9}},{"id":99,"name":"Lux","stats":{"totalSessionsPlayed":16,"totalSessionsLost":7,"totalSessionsWon":9,"totalChampionKills":80,"totalDamageDealt":1673813,"totalDamageTaken":163539,"mostChampionKillsPerSession":11,"totalMinionKills":2325,"totalDoubleKills":9,"totalTripleKills":2,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":158239,"mostSpellsCast":0,"totalTurretsKilled":17,"totalPhysicalDamageDealt":300842,"totalMagicDamageDealt":1368437,"totalFirstBlood":0,"totalAssists":129,"maxChampionsKilled":11}},{"id":67,"name":"Vayne","stats":{"totalSessionsPlayed":2,"totalSessionsLost":0,"totalSessionsWon":2,"totalChampionKills":22,"totalDamageDealt":167150,"totalDamageTaken":28688,"mostChampionKillsPerSession":14,"totalMinionKills":301,"totalDoubleKills":7,"totalTripleKills":1,"totalQuadraKills":1,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":20432,"mostSpellsCast":0,"totalTurretsKilled":4,"totalPhysicalDamageDealt":152723,"totalMagicDamageDealt":776,"totalFirstBlood":0,"totalAssists":7,"maxChampionsKilled":14}},{"id":27,"name":"Singed","stats":{"totalSessionsPlayed":3,"totalSessionsLost":2,"totalSessionsWon":1,"totalChampionKills":5,"totalDamageDealt":346397,"totalDamageTaken":88459,"mostChampionKillsPerSession":4,"totalMinionKills":495,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":25700,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":21800,"totalMagicDamageDealt":319523,"totalFirstBlood":0,"totalAssists":15,"maxChampionsKilled":4}},{"id":61,"name":"Orianna","stats":{"totalSessionsPlayed":4,"totalSessionsLost":2,"totalSessionsWon":2,"totalChampionKills":17,"totalDamageDealt":414717,"totalDamageTaken":38020,"mostChampionKillsPerSession":8,"totalMinionKills":664,"totalDoubleKills":1,"totalTripleKills":1,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":37407,"mostSpellsCast":0,"totalTurretsKilled":3,"totalPhysicalDamageDealt":76270,"totalMagicDamageDealt":334999,"totalFirstBlood":0,"totalAssists":33,"maxChampionsKilled":8}},{"id":60,"name":"Elise","stats":{"totalSessionsPlayed":2,"totalSessionsLost":2,"totalSessionsWon":0,"totalChampionKills":3,"totalDamageDealt":147480,"totalDamageTaken":28170,"mostChampionKillsPerSession":2,"totalMinionKills":200,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":14018,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":54245,"totalMagicDamageDealt":86456,"totalFirstBlood":0,"totalAssists":9,"maxChampionsKilled":2}},{"id":1,"name":"Annie","stats":{"totalSessionsPlayed":1,"totalSessionsLost":1,"totalSessionsWon":0,"totalChampionKills":0,"totalDamageDealt":13324,"totalDamageTaken":9213,"mostChampionKillsPerSession":0,"totalMinionKills":11,"totalDoubleKills":0,"totalTripleKills":0,"totalQuadraKills":0,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":3577,"mostSpellsCast":0,"totalTurretsKilled":0,"totalPhysicalDamageDealt":2566,"totalMagicDamageDealt":10523,"totalFirstBlood":0,"totalAssists":1,"maxChampionsKilled":0}},{"id":0,"name":"Combined","stats":{"totalSessionsPlayed":225,"totalSessionsLost":101,"totalSessionsWon":124,"totalChampionKills":675,"killingSpree":367,"totalDamageDealt":14073387,"totalDamageTaken":3554785,"mostChampionKillsPerSession":14,"totalMinionKills":16092,"totalDoubleKills":53,"totalTripleKills":9,"totalQuadraKills":2,"totalPentaKills":0,"totalUnrealKills":0,"totalGoldEarned":2020336,"mostSpellsCast":0,"totalTurretsKilled":184,"totalPhysicalDamageDealt":7995723,"totalMagicDamageDealt":5777645,"totalNeutralMinionsKilled":1333,"totalFirstBlood":0,"totalAssists":2649,"totalHeal":850529,"maxLargestKillingSpree":11,"maxLargestCriticalStrike":1516,"maxChampionsKilled":14,"maxTimePlayed":4243,"maxTimeSpentLiving":2378,"normalGamesPlayed":0,"rankedSoloGamesPlayed":0,"rankedPremadeGamesPlayed":0,"botGamesPlayed":0}}];



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


   //break up function..too big
   $scope.compareStats = function(){

      $scope.statComparisonTableRows = [{"left":{"leftStatSum":36,"color":"green","icon":"arrow-up"},"statName":"totalSessionsPlayed","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":17,"color":"green","icon":"arrow-up"},"statName":"totalSessionsLost","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":19,"color":"green","icon":"arrow-up"},"statName":"totalSessionsWon","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":35,"color":"green","icon":"arrow-up"},"statName":"totalChampionKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":972895,"color":"green","icon":"arrow-up"},"statName":"totalDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":864959,"color":"green","icon":"arrow-up"},"statName":"totalDamageTaken","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":3,"color":"green","icon":"arrow-up"},"statName":"mostChampionKillsPerSession","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":898,"color":"green","icon":"arrow-up"},"statName":"totalMinionKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalDoubleKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalTripleKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalQuadraKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalPentaKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalUnrealKills","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":314762,"color":"green","icon":"arrow-up"},"statName":"totalGoldEarned","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"mostSpellsCast","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":15,"color":"green","icon":"arrow-up"},"statName":"totalTurretsKilled","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":258861,"color":"green","icon":"arrow-up"},"statName":"totalPhysicalDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":713319,"color":"green","icon":"arrow-up"},"statName":"totalMagicDamageDealt","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":0,"color":"green","icon":"arrow-up"},"statName":"totalFirstBlood","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":501,"color":"green","icon":"arrow-up"},"statName":"totalAssists","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}},{"left":{"leftStatSum":3,"color":"green","icon":"arrow-up"},"statName":"maxChampionsKilled","right":{"rightStatSum":0,"color":"red","icon":"arrow-down"}}] 

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

      var leftStatSums = [], rightStatSums = [], tableRows = [], statNames;

      //Get stat names from champion object
      var statNames = Object.keys($scope.leftSummonerData.championDataFromApi[0].stats);

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

      var statSumObj = {};
      for(var i=0; i<statNames.length; i++){

         statSumObj[statNames[i]] = {
            left: leftStatSums[i],
            right: rightStatSums[i]
         };

      }


      // var difference, leftIcon, rightIcon;
      // for(var i=0; i<statNames.length; i++){

      //    difference = leftStatSums[i] - rightStatSums[i];

      //    //Color and icon info for glyphicons in stat comparison table
      //    leftIcon = {color: 'Orange', icon: 'minus'}, 
      //    rightIcon = {color: 'Orange', icon: 'minus'};

      //    //Change glyphicon color and icon depending on stat difference
      //    if(difference < 0){
      //       leftIcon = {color: 'Red', icon: 'arrow-down'};
      //       rightIcon = {color: 'Blue', icon: 'arrow-up'};
      //    } 
      //    else if(difference > 0){
      //       leftIcon = {color: 'Blue', icon: 'arrow-up'};
      //       rightIcon = {color: 'Red', icon: 'arrow-down'};
      //    }

      //    tableRows.push({
      //       left: {
      //          leftStatSum: leftStatSums[i],
      //          color: leftIcon.color,
      //          icon: leftIcon.icon
      //       },
      //       statName: statNames[i],
      //       right: {
      //          rightStatSum: rightStatSums[i],
      //          color: rightIcon.color,
      //          icon: rightIcon.icon
      //       }
      //    });

      // }

      // $scope.statComparisonTableRows = tableRows;
      // $scope.showStatCompareTable = true;


      var ctx = $('#damageChart').get(0).getContext('2d');
      var damageChart = new Chart(ctx);

      var data = {
         labels : ['xDranik', 'Skittl'],
         datasets : [
            {
               fillColor : "rgba(180,181,180,0.75)",
               strokeColor : "rgba(220,220,220,1)",
               data : [statSumObj.totalDamageDealt.left, statSumObj.totalDamageDealt.right]
            },
            {
               fillColor : "rgba(232,0,0,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalPhysicalDamageDealt.left, statSumObj.totalPhysicalDamageDealt.right]
            },
            {
               fillColor : "rgba(0,114,191,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalMagicDamageDealt.left, statSumObj.totalMagicDamageDealt.right]
            }
         ]
      };
      damageChart = damageChart.Bar(data);



      var ctx = $('#ka').get(0).getContext('2d');
      var kaChart = new Chart(ctx);

      var data = {
         labels : ['xDranik', 'Skittl'],
         datasets : [
            {
               fillColor : "rgba(232,0,0,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalChampionKills.left, statSumObj.totalChampionKills.right]
            },
            {
               fillColor : "rgba(0,114,191,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalAssists.left, statSumObj.totalAssists.right]
            }
         ]
      };      
      kaChart = kaChart.Bar(data);



      var ctx = $('#goldEarned').get(0).getContext('2d');
      var goldEarned = new Chart(ctx);

      var data = {
         labels : ['xDranik', 'Skittl'],
         datasets : [
            {
               fillColor : "rgba(255,170,0,0.75)",
               strokeColor : "rgba(220,220,220,1)",
               data : [statSumObj.totalGoldEarned.left, statSumObj.totalGoldEarned.right]
            }
         ]
      };      
      goldEarned = goldEarned.Bar(data);




      var ctx = $('#minionsKilled').get(0).getContext('2d');
      var minionsKilled = new Chart(ctx);

      var data = {
         labels : ['xDranik', 'Skittl'],
         datasets : [
            {
               fillColor : "rgba(255,170,0,0.75)",
               strokeColor : "rgba(220,220,220,1)",
               data : [statSumObj.totalMinionKills.left, statSumObj.totalMinionKills.right]
            }
         ]
      };      
      minionsKilled = minionsKilled.Bar(data);



      //killstreaks
      var ctx = $('#killstreaks').get(0).getContext('2d');
      var killstreaks = new Chart(ctx);

      var data = {
         labels : ['xDranik', 'Skittl'],
         datasets : [
            {
               fillColor : "rgba(255,170,0,0.75)",
               strokeColor : "rgba(220,220,220,1)",
               data : [statSumObj.totalDoubleKills.left, statSumObj.totalDoubleKills.right]
            },
            {
               fillColor : "rgba(232,0,0,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalTripleKills.left, statSumObj.totalTripleKills.right]
            },
            {
               fillColor : "rgba(0,114,191,0.75)",
               strokeColor : "rgba(220,220,220,1)",
               data : [statSumObj.totalQuadraKills.left, statSumObj.totalQuadraKills.right]
            },
            {
               fillColor : "rgba(180,181,180,0.75)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalPentaKills.left, statSumObj.totalPentaKills.right]
            },
            {
               fillColor : "rgba(255,255,255,0.5)",
               strokeColor : "rgba(151,187,205,1)",
               data : [statSumObj.totalUnrealKills.left, statSumObj.totalUnrealKills.right]
            }
         ]
      };      
      killstreaks = killstreaks.Bar(data);



      //win rate


   }

});








