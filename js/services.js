'use strict';

angular.module('dataGenerators',[])
	.service('dataGen', function () {
			this.createTable = function (rounds, startRound, endRound) {			// rounds  for data in the compatible format, start round and end round for culling purposes
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
		this.generateRounds = function (teamsArray, roundsCount, FaceToFaceCount) {
			
			function removeTeam (teamToRemove, tArray) {
				for (i = 0; i < tArray.length; ++i) {
    				if (tArray[i] === teamToRemove) {
        				tArray.splice(i--, 1);
    				}
				}
			}
			
			//var facingPool;								// Array of arrays of teams each team can still face.
			
			//for (var teamIndex = 0; teamIndex < teamsArray.length; teamIndex++) {
			
			
			//}			
			
			
			
			
			
			
			
							
				
	});
	