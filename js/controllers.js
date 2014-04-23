'use strict';

angular.module('eplApp',['dataGenerators', 'ngSlider'])
//angular.module('eplApp',['ngSlider'])

	.controller('TableCtrl', ['$scope','dataGen','shirtGen', function ($scope, dataGenServ, shirtGenServ) {
		//.controller('TableCtrl', ['$scope', function ($scope) {	
		
		// Sliders
		
//		$scope.tmcountoptions = "1;6";
		$scope.tmcountvalue = "20";
		$scope.tmcountoptions = {       
				from: 6,
				to: 40,
				step: 2,
				dimension: " teams"        
		};
		
		var canvas = document.getElementById('canvasimagefactory');
		var shirtArray = shirtGenServ.generateImages(canvas, parseInt($scope.tmcountvalue));
		

		
		$scope.endRound = 11;
		$scope.startRound = 1;
	
		$scope.roundsvalue = "1;12";
		$scope.roundsoptions = {       
				from: 1,
				to: parseInt($scope.tmcountvalue)-1,
				step: 1,
				smooth: false,
				dimension: " round"        
		};
	
		$scope.$watch(	// rounds slider watcher
				// This is the listener function
				function() { return $scope.roundsvalue;},
				// This is the change handler
				function(newValue, oldValue) {
					if ( newValue !== oldValue ) {
						var res = newValue.split(";");
						$scope.table = dataGenServ.createTable(rounds, parseInt(res[0]),  parseInt(res[1]), shirts); // parseInt(res[0]) - starting round, parseInt(res[1]) - ending round 
					}
				}
		);
		
		$scope.$watch( 
				function () { return $scope.tmcountvalue;},
				function (newValue, oldValue) {
					if ( newValue !== oldValue ) {
						regenerateTeams(newValue);
					}
				});
	
	
		//var rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
		var initSliderValues = $scope.roundsvalue.split(";");
		
		var tNames = dataGenServ.genNames(parseInt($scope.tmcountvalue));		
		var shirts = {};
		angular.forEach(tNames, function (value,index) {
			this[value] = shirtArray[index];
		}, shirts);
		
		var rounds = dataGenServ.generateRounds(tNames);
		//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		$scope.table = dataGenServ.createTable(rounds, initSliderValues[0], initSliderValues[1], shirts);
		
		
		function regenerateTeams (teamcount) {			
			// Change options of rounds slider
			$scope.roundsoptions = {       
					from: 1,
					to: teamcount-1,
					step: 1,
					smooth: false,
					dimension: " round"        
			};
			
			shirtArray = shirtGenServ.generateImages(canvas, teamcount);
			tNames = dataGenServ.genNames(teamcount);
			angular.forEach(tNames, function (value,index) {
				this[value] = shirtArray[index];
			}, shirts);
			rounds = dataGenServ.generateRounds(tNames);
			$scope.table = dataGenServ.createTable(rounds, initSliderValues[0], initSliderValues[1], shirts);			
		}
		
		$scope.regenTeams = function () {
			regenerateTeams($scope.tmcountvalue);
		}
	
		$scope.regenSeason = function () {
			var curSliderValues = $scope.roundsvalue.split(";");
			rounds = dataGenServ.generateRounds(tNames);
			//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
			$scope.table = dataGenServ.createTable(rounds, curSliderValues[0], curSliderValues[1], shirts);
		}
		
		
	
	}]);


