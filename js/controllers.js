'use strict';

angular.module('eplApp',['dataGenerators', 'ngSlider'])
//angular.module('eplApp',['ngSlider'])

	.controller('TableCtrl', ['$scope','dataGen','shirtGen', function ($scope, dataGenServ, shirtGenServ) {
		//.controller('TableCtrl', ['$scope', function ($scope) {	
		
		var canvas = document.getElementById('canvasimagefactory');
		var shirtArray = shirtGenServ.generateImages(canvas, 20);
		
		$scope.image = shirtArray[0];
	
		$scope.endRound = 11;
		$scope.startRound = 1;
	
		$scope.value = "1;12";
		$scope.options = {       
				from: 1,
				to: 19,
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
						$scope.table = dataGenServ.createTable(rounds, parseInt(res[0]),  parseInt(res[1])); // parseInt(res[0]) - starting round, parseInt(res[1]) - ending round 
					}
				}
		);	
	
	
		//var rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
		var initSliderValues = $scope.value.split(";");
		var tNames = dataGenServ.genNames(20);
		var rounds = dataGenServ.generateRounds(tNames);
		//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		$scope.table = dataGenServ.createTable(rounds, initSliderValues[0], initSliderValues[1]);
	
		$scope.regen = function () {
			var curSliderValues = $scope.value.split(";");
			rounds = dataGenServ.generateRounds(tNames);
			//$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
			$scope.table = dataGenServ.createTable(rounds, curSliderValues[0], curSliderValues[1]);
		}
		
		
	
	}])
	.directive('shirt', function() {
		return {
			restrict: 'E',
			scope: {
				teamname: '='
			},
			templateUrl: 'templates/shirt.html'
		};
	});


