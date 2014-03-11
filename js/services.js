'use strict';

angular.module('dataGenerators', [])
	 .service('dataUtils', function () {
	 
	 this.roll = function (teamIndex) {
        		var mod;
        		if (teamIndex > 8) mod = 8;	// cap it at 8 modifier so that all teams would have a chance of win
        		else mod = teamIndex;
        		return Math.floor((Math.random()*10)) - mod;	
        }
    
    this.rollForResult = function (teamIndex1, teamIndex2) {	// executed in makeRound to decide the winner based on team's index
        		
        			//var result = {};	
        			var roll1 = this.roll(teamIndex1);
        			var roll2 = this.roll(teamIndex2);
        			
        			if (roll1 === roll2) return { result1: "drawnteam1", result2: "drawnteam2" };
        			else if (roll1 > roll2) return { result1: "winteam", result2: "lossteam" };
        			else if (roll1 < roll2) return { result1: "lossteam", result2: "winteam" };    		
        	}    
        
	 
	 })

    .service('dataGen', function (dataUtils) {
    this.createTable = function (rounds, startRound, endRound) { // rounds  for data in the compatible format, start round and end round for culling purposes
        var cRound = {}; // current round, current game. Variables reserved for clarity
        var cGame = {};

        var teamsIndices = {};
        var acTeamsArray = [];
        var tIndex = 0;


        function teamInit(teamName) {
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


        function add(propertyname) {

            return function (teamName) {
                teamInit(teamName);
                acTeamsArray[teamsIndices[teamName]][propertyname] += 1;
                if (propertyname === "wins") acTeamsArray[teamsIndices[teamName]].pts += 3;
                else if (propertyname === "draws") acTeamsArray[teamsIndices[teamName]].pts += 1;

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
    
    
    this.generateRounds = function (teamsArray) {


        function primeSlots(tarrayLength) {
            var slots = [];
            var tnum = tarrayLength - 1; // skip the first one since it won't be part of the slot rotation
            for (var i = 0; i < tnum; i++) slots.push(tnum - i); // 11,10,9,8 ...

            return slots;
        }
        /*
        function roll (teamIndex) {
        		var mod;
        		if (teamIndex > 8) mod = 8;	// cap it at 8 modifier so that all teams would have a chance of win
        		else mod = teamIndex;
        		return Math.floor((Math.random()*10)) - mod;	
        }*/
        /*
        function rollForResult (teamIndex1, teamIndex2) {	// executed in makeRound to decide the winner based on team's index
        		
        			//var result = {};	
        			var roll1 = dataUtils.roll(teamIndex1);
        			var roll2 = dataUtils.roll(teamIndex2);
        			
        			if (roll1 === roll2) return { result1: "drawnteam1", result2: "drawnteam2" };
        			else if (roll1 > roll2) return { result1: "winteam", result2: "lossteam" };
        			else if (roll1 < roll2) return { result1: "lossteam", result2: "winteam" };    		
        	}*/
        
        function makeRound(tArray, slots) {	// tArray - array of all teams, slots - round robin wheel array
        
            var round = [];
            round[0] = {};
            
            var rl = dataUtils.rollForResult(0, slots[0]);
            round[0][rl.result1] = tArray[0]; //team1
            round[0][rl.result2] = tArray[slots[0]]; // team1 always plays against slot 0

            var gameIndex = 1;
            var pcounter = 1;
            for (var slotIndex = 1; slotIndex < tArray.length / 2; slotIndex++) {
					 var teamIndex1 = slots[slotIndex];
					 var teamIndex2 = slots[slots.length - pcounter];
					 var roll = dataUtils.rollForResult( teamIndex1, teamIndex2);      	
            	
                round[gameIndex] = {};
                round[gameIndex][roll.result1] = tArray[teamIndex1];
                round[gameIndex][roll.result2] = tArray[teamIndex2];
                pcounter++;
                gameIndex++;
            }

            return round;
        }

        function rotateSlots(slots) {
            for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
                if (slots[slotIndex] >= slots.length) // set 12 o clock
                slots[slotIndex] = 1; // t2 originally
                else slots[slotIndex] += 1;
            }
        }

		  var tLength = teamsArray.length;
        var numRounds = tLength - 1; 		// one less than the amount of teams
        var slots = primeSlots(tLength);
        
	     var rounds = [];
	     for (var i = 0; i < numRounds; i++) {
	         rounds.push(makeRound(teamsArray, slots));
	         rotateSlots(slots);
	     }
	     
		  	     
	     return rounds;

    }

});