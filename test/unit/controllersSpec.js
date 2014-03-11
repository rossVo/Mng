'use strict';

/* jasmine specs for controllers go here */


describe('DataGenerators', function () {
	
	describe('dataUtils', function () {

		var serviceObj;
		
		
		beforeEach(function () {
			
			module('dataGenerators');
			inject(function (dataUtils) {
				serviceObj = dataUtils;			
			})
		
		});
		
		it('roll function result should be between -8 and 10', function () {
			var result = serviceObj.roll(5);
			expect(result).toBeLessThan(11);
			expect(result).toBeGreaterThan(-9);
			
			result = serviceObj.roll(0); expect(result).toBeLessThan(11); expect(result).toBeGreaterThan(-9);
			result = serviceObj.roll(3); expect(result).toBeLessThan(11); expect(result).toBeGreaterThan(-9);
			result = serviceObj.roll(33); expect(result).toBeLessThan(11); expect(result).toBeGreaterThan(-9);		
		
		});
		
		it('rollForResult cannot return an empty object', function () {
			var result = serviceObj.rollForResult(1,1);			
			expect(result).not.toBeNull();			
		});
		
		it('rollForResult cannot return two winning teams', function () {
			var result = serviceObj.rollForResult(1,1);			
			expect(result).not.toEqual({result1:"winteam",result2:"winteam"});			
		});
		
		it('rollForResult cannot return two losing teams', function () {
			var result = serviceObj.rollForResult(1,1);			
			expect(result).not.toEqual({result1:"lossteam",result2:"lossteam"});			
		});
		
		it('rollForResult should return either one winning team and losing team or two drawnteams', function () {			
				
			
			var result = serviceObj.rollForResult(1,1);
			
			var pass = function (r) {
				var res = JSON.stringify(r);				
				
				if (res === JSON.stringify({result1:"winteam",result2:"lossteam"}) ) return true;
				else if (res === JSON.stringify({result1:"lossteam",result2:"winteam"}) ) return true;
				else if (res === JSON.stringify({result1:"drawnteam2",result2:"drawnteam2"}) ) return true;
				else if (res === JSON.stringify({result1:"drawnteam1",result2:"drawnteam2"}) ) return true;
				else return false;				
			}		
						
			expect(pass(result)).toBe(true);			
		});	
	
	});	
	
	describe('dataGen', function () {
		
		var roundsData;
		var service;
		var tableData;
		
		beforeEach(function () {
			module('dataGenerators');				// open relevant module for injector
			inject(function (dataGen) {		// injector will find service by its name 'dataGen'
				service = dataGen;				// set variable service to refer to dataGen object so that we could access it later in 'it'
			})
		
		});
		
		describe('generateNames spec', function () {
				
				it('genNames should only give even number of teams', function () {
					expect(service.genNames(11).length % 2).toEqual(0);										
				});
				
				it('genNames should give correct number of teams', function () {
					expect(service.genNames(20).length).toEqual(20);			
				
				});
				
				it('genNames should exceed the limit of 30 teams and minimum of 6 teams', function () {
					expect(service.genNames(55).length).toEqual(30);
					expect(service.genNames(2).length).toEqual(6);					
				});		
		
		
		});		
		
		
		
		describe('createTable', function () {
			beforeEach(function () {
					
					roundsData = [				// initialise testing data
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
