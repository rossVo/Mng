'use strict';

/* jasmine specs for controllers go here */
/*
describe('Global data creation functions', function () {
	
	describe('createTable function', function () {
		
		var roundsData;
		var tableData;

		beforeEach(function () {
			
			roundsData = [
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
		  ]
		];
		
		tableData = createTable(roundsData, 1, 3);
				
		
		});
		it('mancity should have 3 wins considering the data', function () {
			expect(tableData[0]["wins"]).toEqual(3);
			
		});
		
		it('It should come up with 8 teams, given the data', function () {
			expect(tableData.length).toEqual(8);			
			});
		
		it('Second team in array should be Chelsea', function () {
			expect(tableData[1]["name"]).toEqual("Chelsea");
				
		
		});	
	
	});


});*/

describe('DataGenerators', function () {
	describe('dataGen', function () {
		
		var roundsData;
		var service;
		var tableData;
		
		beforeEach(function () {
			module('dataGenerators');				// open relevant module
			inject(function (dataGen) {		// injector will find service by it name 'dataGen'
				service = dataGen;				// set variable service to refer to dataGen object so that we could access it later in 'it'
			})
		
		});
		
		beforeEach(function () {
				
				roundsData = [
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
				  ]
				];
				
				tableData = service.createTable(roundsData, 1, 3);	// createTable()		
						
			});
			
			it('mancity should have 3 wins considering the data', function () {
				expect(tableData[0]["wins"]).toEqual(3); });
				
			it('It should come up with 8 teams, given the data', function () {
				expect(tableData.length).toEqual(8);});
		
			it('Second team in array should be Chelsea', function () {
				expect(tableData[1]["name"]).toEqual("Chelsea");});	
	
	
	});



});


describe('eplApp controllers', function () {

	beforeEach(module('eplApp'));
	it('test', function () {
		expect(true).toBe(true);	
	})
	
	describe('TableCtrl', function () {
		var scope, ctrl, roundsData, tableData;
		
		
		
		beforeEach(inject(function ($rootScope, $controller) {
				
			scope = $rootScope.$new();
			ctrl = $controller('TableCtrl', {$scope: scope});
		
		
		}));
		
	})

});


/*
describe('eplApp controllers', function() {

  beforeEach(module('eplApp'));

  describe('TableCtrl', function(){
  	var scope, ctrl;
  	
  
  	
  	
  	
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toBeUndefined();
      $httpBackend.flush();

      expect(scope.phones).toEqual([{name: 'Nexus S'},
                                   {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond({name:'phone xyz'});

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toBeUndefined();
      $httpBackend.flush();

      expect(scope.phone).toEqual({name:'phone xyz'});
    });
  });
});*/
