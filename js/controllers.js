'use strict';

var eplApp = angular.module('eplApp',[]);

var mRounds = [
  [
    {
      "winteam":"ManCity",
      "lossteam":"Chelsea"
    },
    {
      "drawnteam1":"Arsenal",
      "drawnteam2":"Liverpool"
    },
    {
      "winteam":"Everton",
      "lossteam":"Tottenham"
    },
    {
      "winteam":"ManUnited",
      "lossteam":"Newcastle"
    }    
  ],
  [
    {
      "winteam":"ManCity",
      "lossteam":"Arsenal"
    },
    {
      "drawnteam1":"Newcastle",
      "drawnteam2":"Tottenham"
    },
    {
      "winteam":"Liverpool",
      "lossteam":"Everton"
    },
    {
      "winteam":"Chelsea",
      "lossteam":"ManUnited"
    }    
  ],
  [
    {
      "winteam":"ManCity",
      "lossteam":"Everton"
    },
    {
      "drawnteam1":"ManUnited",
      "drawnteam2":"Newcastle"
    },
    {
      "winteam":"Chelsea",
      "lossteam":"Tottenham"
    },
    {
      "winteam":"Arsenal",
      "lossteam":"Liverpool"
    }    
  ],
  [
    {
      "winteam":"Chelsea",
      "lossteam":"ManCity"
    },
    {
      "drawnteam1":"Everton",
      "drawnteam2":"Liverpool"
    },
    {
      "winteam":"Arsenal",
      "lossteam":"ManUnited"
    },
    {
      "winteam":"Tottenham",
      "lossteam":"Newcastle"
    }    
  ],
  [
    {
      "winteam":"ManCity",
      "lossteam":"Liverpool"
    },
    {
      "drawnteam1":"Tottenham",
      "drawnteam2":"Everton"
    },
    {
      "winteam":"Chelsea",
      "lossteam":"ManUnited"
    },
    {
      "winteam":"Arsenal",
      "lossteam":"Newcastle"
    }    
  ]

];

eplApp.controller('TableCtrl', function ($scope) {
	
	$scope.endRound = 3;
	$scope.startRound = 1;
	
	$scope.$watch(
		// This is the listener function
		function() { return $scope.endRound; },
		// This is the change handler
		function(newValue, oldValue) {
			if ( newValue !== oldValue ) {
					$scope.table = createTable(rounds, $scope.startRound,  newValue);
				}
			}
	);
	
	$scope.$watch(
		// This is the listener function
		function() { return $scope.startRound; },
		// This is the change handler
		function(newValue, oldValue) {
			if ( newValue !== oldValue ) {
					$scope.table = createTable(rounds, newValue,  $scope.endRound);
				}
			}
	);
	
	var rounds = mRounds;
	
	/*
	$http.get('data/mocktable.json').success(function (data) {
	//$http.get('data/rounds.json').success(function (data) {
			
		//$scope.table = createTable(data);	
				
		
		});*/
	//$http.get('data/rounds.json').success(function (rounds) {
		$scope.table = createTable(rounds, $scope.startRound, $scope.endRound);

	});
	
function createTable(rounds, startRound, endRound) {			// rounds  for data in the compatible format, start round and end round for culling purposes
	var cRound = {};	// current round, current game. Variables reserved for clarity
	var cGame = {};

	var teamsIndices = {};
	var acTeamsArray = [];
	var tIndex = 0; 
	
		
	function teamInit (teamName) {
		if (teamsIndices.hasOwnProperty(teamName) == false) {
			teamsIndices[teamName] = tIndex;
			
			acTeamsArray.push({});
			acTeamsArray[tIndex].name = teamName;
			acTeamsArray[tIndex].wins = 0;
			acTeamsArray[tIndex].losses = 0;
			acTeamsArray[tIndex].draws = 0;
			acTeamsArray[tIndex].pts = 0;			
			
			tIndex++;
		}
	}
	
	
	function add (propertyname) {			

		return function (teamName) {
			teamInit (teamName);
			acTeamsArray[teamsIndices[teamName]][propertyname] += 1;
			if (propertyname === "wins") acTeamsArray[teamsIndices[teamName]].pts += 3;
			else if ( propertyname === "draws" ) acTeamsArray[teamsIndices[teamName]].pts += 1;
			
		}
	}
	
	var addWin = add("wins");
	var addLoss = add("losses");
	var addDraw = add("draws");
	var roundIndex = startRound - 1;
	
	for (; roundIndex < rounds.length && roundIndex < endRound; roundIndex++) {
		cRound = rounds[roundIndex];
		for (var gameIndex = 0; gameIndex < cRound.length; gameIndex++) {
			cGame = cRound[gameIndex];
			if (cGame.hasOwnProperty("winteam")) addWin(cGame.winteam);
			if (cGame.hasOwnProperty("lossteam")) addLoss(cGame.lossteam);
			if (cGame.hasOwnProperty("drawnteam1")) addDraw(cGame.drawnteam1);
			if (cGame.hasOwnProperty("drawnteam2")) addDraw(cGame.drawnteam2);
			
		}
				
	}
	return acTeamsArray;
}