'use strict';

angular.module('eplApp',['dataGenerators', 'ngSlider'])
//angular.module('eplApp',['ngSlider'])

	.controller('TableCtrl', ['$scope','dataGen', function ($scope, dataGenServ) {
	//.controller('TableCtrl', ['$scope', function ($scope) {	
		
		$scope.endRound = 11;
		$scope.startRound = 1;
		
		$scope.value = "1;12";
		$scope.options = {       
        from: 1,
        to: 11,
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
		
		
		var rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
		$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		
		$scope.regen = function () {
			rounds = dataGenServ.generateRounds(["ManCity","Tottenham","Everton","Chelsea","Arsenal","Liverpool","Hull","ManU","Swansea","Fulham","WestHam","Newcastle"]);
			$scope.table = dataGenServ.createTable(rounds, $scope.startRound, $scope.endRound);
		}
	
}]);