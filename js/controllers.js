'use strict';

angular.module('eplApp',['dataGenerators'])

	.controller('TableCtrl', ['$scope','dataGen', function ($scope, dataGenServ) {
		
		$scope.endRound = 11;
		$scope.startRound = 1;
		
		$scope.$watch(
			// This is the listener function
			function() { return $scope.endRound; },
			// This is the change handler
			function(newValue, oldValue) {
				if ( newValue !== oldValue ) {
						if (newValue <= $scope.startRound) {}
						else { 
							$scope.table = dataGenServ.createTable(rounds, $scope.startRound,  newValue);
						}
					}
				}
		);
		
		$scope.$watch(
			// This is the listener function
			function() { return $scope.startRound; },
			// This is the change handler
			function(newValue, oldValue) {
				if ( newValue !== oldValue ) {
						if (newValue >= $scope.endRound) {}
						else {
							$scope.table = dataGenServ.createTable(rounds, newValue,  $scope.endRound);
						}
					}
				}
		);
		

		
		var rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
		$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		
		$scope.regen = function () {
			rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
			$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		}
	
}]);