'use strict';

angular.module('eplApp',['dataGenerators', 'ngSlider'])
//angular.module('eplApp',['ngSlider'])

	.controller('TableCtrl', ['$scope','dataGen','shirtGen', function ($scope, dataGenServ, shirtGenServ) {
		//.controller('TableCtrl', ['$scope', function ($scope) {	
		
		var teamCount = 22;
		var canvas = document.getElementById('canvasimagefactory');
		var shirtArray = shirtGenServ.generateImages(canvas, teamCount);
		
		$scope.endRound = 11;
		$scope.startRound = 1;
	
		$scope.value = "1;12";
		$scope.options = {       
				from: 1,
				to: teamCount-1,
				step: 1,
				smooth: false,
				dimension: " round"        
		};
	
		$scope.$watch(
				// This is the listener function
				function() { return $scope.value },
				// This is the change handler
				function(newValue, oldValue) {
					if ( newValue !== oldValue ) {
						var res = newValue.split(";");
						$scope.table = dataGenServ.createTable(rounds, parseInt(res[0]),  parseInt(res[1]), shirts); // parseInt(res[0]) - starting round, parseInt(res[1]) - ending round 
					}
				}
		);	
	
	
		//var rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
		var initSliderValues = $scope.value.split(";");
		
		var tNames = dataGenServ.genNames(teamCount);		
		var shirts = {};
		angular.forEach(tNames, function (value,index) {
			this[value] = shirtArray[index];
		}, shirts);
		
		var rounds = dataGenServ.generateRounds(tNames);
		//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		$scope.table = dataGenServ.createTable(rounds, initSliderValues[0], initSliderValues[1], shirts);
		
		$scope.regenTeams = function () {
			tNames = dataGenServ.genNames(teamCount);
			angular.forEach(tNames, function (value,index) {
				this[value] = shirtArray[index];
			}, shirts);
			rounds = dataGenServ.generateRounds(tNames);
			$scope.table = dataGenServ.createTable(rounds, initSliderValues[0], initSliderValues[1], shirts);
		}
	
		$scope.regenSeason = function () {
			var curSliderValues = $scope.value.split(";");
			rounds = dataGenServ.generateRounds(tNames);
			//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
			$scope.table = dataGenServ.createTable(rounds, curSliderValues[0], curSliderValues[1], shirts);
		}
		
		
	
	}]);


