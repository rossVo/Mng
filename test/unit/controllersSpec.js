'use strict';

/* jasmine specs for controllers go here */


describe('DataGenerators,', function () {
	
	beforeEach(function () {		
		module('dataGenerators');			
	});
	
	describe('ShirtGen,', function () {
		
		var serviceObj;
		
		beforeEach(function () {
			
			//module('dataGenerators');
			inject(function (shirtGen) {
				serviceObj = shirtGen;			
			});
		
		});
		
		describe('Generate random colors function randomColors,', function (){
			it('it should generate specified amount of colors', function() {
				var amount = 3;
				expect(serviceObj.randomColors(amount).length).toBe(amount);
			});
		});

		describe('genColor() function,', function () {
			var colorString;
			beforeEach(function() {
				colorString = serviceObj.genColor();
			});

			it ('First letter of color should be hash', function() {			
				expect(colorString.charAt(0)).toBe('#');
			});
			it ('string has to be exactly 7 chars long', function() {
				expect(colorString.length).toBe(7);
			});		
		});
		
	});
	
	describe('dataUtils,', function () {

		var serviceObj;
		
		
		beforeEach(function () {
			
//			module('dataGenerators');
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
	
	describe('dataGen,', function () {
		
		var roundsData;
		var service;
		var tableData;
		
		beforeEach(function () {
//			module('dataGenerators');				// open relevant module for injector
			inject(function (dataGen) {		// injector will find service by its name 'dataGen'
				service = dataGen;				// set variable service to refer to dataGen object so that we could access it later in 'it'
			})
		
		});
		
		describe('generateNames spec,', function () {
				
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
			
			var shirtsArray = {};
			
			beforeEach(function () {
				
					// initialise testing data
				
					shirtsArray = {
							"ManCity": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC7ElEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ4xJvGZ+byVP/J5K/5PE1pEVQwyM5Y79bsok9gCkF208oSVCZvFw51iJ7/CLD4lcZuqGGbuLrFTX6zY7Z8A7dSkqg94mfhLy/kafqJbSCuPgNgnxG/+ruPv+M7DxFdLDT8oWrHZnVwjuvMrLgtp5REY3ix66JsSi8oRkFvI9URiHE/aZ2ItpJVHQPi4+M0/sdwpP4BuSibFAwJKLKqHpgst/UaqhbTyCAzPFF72XY1Fcz3QjZKEPGEZxxn3fhXvgr+UWEgrj4DwGt7F/1K40j4wQIprrEAxlCvm/0nxG/9X8c77v0No56DzyHbBHf9X8swBsz05/H8z4CrVuJl4+3aKnfh2RPTc/yVck/6D6MHikUOiZ8BuOip28T/IjRJMUp34khaHLbvTDZDGXUJ7/6/gngmOoYH2CMgNy4Fu2Sm0C8w3Y7O8TSiPgIBmJk/RT0h6XPR/E/+6AffIZoH1/1fzLgSzs3lKvuJMUuiAj0kgb6XItk/HxC//X8o95f9ekcMD5pGDoieBSWoysAi+9n+5yNYvQOcVEuUJWBLTZtU7ckTi6g+QJ5ZxTwcbRG+PgOxcxj0VHJCgukSDVec0KZ6AAclwrjhwhbiRf/X/Dfwr6O6RdXzL4EkbWCF+B7pJgByPMAgxi4bPEFr6FZTZlvFM/79baB/dPLJbeD/YTlCsgCpnoHMCyPIEDMgxy6/eJ372OyStQoo/WnsElDcXc04AF7lHJK78FGESXUmRJ6CAw4PT/xnIom2CW/+v5Fv4R4fV4CGtPAIyG2QHyC6QmCOH20sGcpMUFuBUJ9D5rVGg+7Mys/J8EJ9WHgGa7SHCJNLVLjDpSzN/3y8GPE0RckEhkqG09AjMDi8gzqS2J9ABPTxCFzDqkVGPjHpk1COjHhn1yKhHRj0y6pFRj4x6ZOh5hFZTb/T2iAAD9SdCYZhq/fNRMAooBADiz7iuJr/rFwAAAABJRU5ErkJggg==",

							"Chelsea":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACGklEQVRoge2ZO0vDUBTHQ2ubR5smbTRtEx8ktMV8BB0dRBzEzVmcHBREHF0FF3c3V3HwO0gX8QsITgURRCdtm/pCz9VeEOnDpvfGCOcPf2ignHN+yck5CREEFAqFQqFQQ2kevA2eY+wN8FIYAFI8kTjU8/kW+H1scpKpSUx1dNSHHEckFy+IWUlRala53KCJJzyPqWlcq1KpS+n0NeT0mBLEYrGdbKHw9DMhLxDye9zzXnKW5UPuXRYMjpxKnRddt9EtIS8QaqtUaiZEsUpqCQqxmjGMx98m5AXyeXWmp19Vw2hBTWuDAOhwBs7MqanmoAl5gVBDTX5SFE+hxmI/iJmUpt3BGXgaJiEvkPbVeUtns/fC17juKAf+wCwhLxBqRdNehG5TDSbEAYzXri0VFRBS40gyud+rtSRJVS+jDgL77KrfPULkaaYZ2XtEN81G15bq0GKbBdd9iBpIwXHqUN7WryBoi4myXIUJ0YoKCNklSVm+GASCqqjmcpFYiMSwEH2oSQ8CIsTj8RVYQo2/BiHLGcpZDgRBBWPuxK5U/L8CIcsZHuuPh4JoS1IymRsamMxw6NUaLxAS+/suk1X1VgjaUh00B4/UTfAjebEix7xAIPYCTM09w7brOdt+Fno8igTV1regPEFojkXwOmuInwoDJBQhCIIgCIIgCIIgCIIgCIIgyP8D4fXpLWwQXWD/IZSa2fs5CjWkPgBaCsty9ZHT9wAAAABJRU5ErkJggg==",

							"Arsenal":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADT0lEQVRoge2ZX0hTURzHL5t/trnpls5tubSr06WeE2IIJfZiZKJmIYQKplhCGbYSC3rI6DUDn0oyiOqhQsyUIqzoj5UoZmV/IehJiKCnIt3UXJ1+58wLYk63uXuFOF/4MXYG5/v7nPP7nXPHFQQuLi4uLi6uFakIogWiMMxxGKJcCQBN5Bp1p22veRp9PEECDfFkUkBhq0kg5p2mKfC4Qr3kgsiPydaOZ3WKbmoaDAi+kR5QSEBZF8VJQ07MF/DMDCuBKkZ1PGlf4sx8QzlB2Pfr6bP2g5YplU7VGg4G0ZCjG3G2p7gXGsoOMhfOc6JHsy56kOYSKkS9udw04c9QKRAW1xxec5lxGnLaHwyAEVbgmbO7dBY/KvNrqCgIBHq8izj7Krza9dG9kKNtOYgtllrHdzRU9xvfxAS9ayb49ubVB+nLI+h9C8E9OQQN1/2xNDh+CL7jelGJ8UVxBHdtIOhFA0EPdhB8bzvBr5vY2KqB0HwgB9RfSNDDEoJHD7BxY4FhVvB3qqm0qvbMC6IH38r17Qb9HKoh+HnVqoGgp3tYDojuCs0JdoXmGJUQcWap0tLEbtJ/YpPAbqCXhwgtMbYrd7cqDoLu5BM05mI5oFeNviqBcT3Sfl6uR6gyrZXx7M6AevStCJ3w7VGCu7OVAwEv2hfUGw9UEDRSz8atVQluvyX1T4npVa6Msyk/2Uq8cfl2g04GYEqBoOFatoj0sJEWMaMteRLSaw4IQioxbZpmMPuqY5pB0NLq2ciaDt8vkh+EljWUEvMcm1tIuEu0qZrRYCAk2eKLjb4LEZodDVb7Gu7DMSKedsgHQueGpmZetMnprsBv5jLTFORkDAVEUMepK1NP2d3SEYj7t7EjUOwolQ+ko4R5sOOWekJJpbbaPZDO7pAgJEVZo7qzLqVNsVqlx19vLhHPF8sKwnqTXoCwK1DeM5EmddeKIOakMRUYvjIzeGRBA9VenUMzLhcIm/tJtVd6PIrN038TQi2pRVRob7R47K61E7oM42X6XS4QmLs4IlHblnzENpncZP0lLPEoEqqa500qJ4jkUQLRGG6IhVICRBFxEA7CQTgIB+EgHISDcBAOwkH+b5BgXr0pDWIUwv8iVIqw/T/n4lqh/gJWRMmn7r5UeAAAAABJRU5ErkJggg==",

							"Liverpool":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACOElEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ52Hv6Zylb+P5Qt/f/r+2ZRFYPMlDN0+s7GzbcAZBetPGElIKXy0Cq++SvMYoeMfqpimLnW8S1fhOQ0nwDt1KSqD1jYuUvVbEN+oltIK4+A2Pbpvb81HCO/s7Bx1VLDD4pCsponzSIqv+KykFYegWHLmLpvXILiR0BuIdcTibIGzp+JtZBWHgHHTlrvH1l9px9ANyWT4gEBbkGJQwZ+Od9ItZBWHoFhQ7+c7zzCUuuBbpQk5AlLCXWz17YpXT8psZBWHgFhu7Sev9La1m8YIMU1VqAorWNDNQtp5REYFlcz+c2Aq1RjYeXss4prxpmkBotHQG5k5xXsxJe0OIQVdG4Mdo8ISKveJpRHQEBTycx70OYRJXOfrziTFDpgZefJMwsr/zTYPGIaVvYF6LxCojwBS2K8YnJH7FK7fwwWj4DqEl5R2dOkeAIGJKV17QZFhQjCwArxO9BNAuR4hIGNkz8cWDF+HWiPgCpnoHMCyPIEDHDyi662SWr7PlAeAVXOwGb9Soo8AQUc4qrGz2AGg8pwPnH5h7TyCMhs5LpMVFH3JQO5SQoLcAI2qb9pOkV9BnWsQHxaeQRotgew6d6m7Rr/Rcs59hcDnqYIuaAQyVBaegRmhxcQZ1LbE+iAHh6hCxj1yKhHRj0y6pFRj4x6ZNQjox4Z9cioR0Y9MvQ8QqupN3p7RICB+hOhMEy1/vkoGAUUAgCM2sZyrExwYAAAAABJRU5ErkJggg==",

							"Everton":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADBUlEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ4ucd6ZxpUeP3Sb3P7rLwwCY6uFkf/dFiWAMYhNrjjITO1U2+9cYrwLQHbRyhNWEhaKD8NOln8FOQBkscQCFzC23pf8P+52ExiD2OSKg8wEmR1+qvyLtL3qE6CdmlT1ATs/Z6l5g89PmOW09ghIPPZm42/rjqDvbHwctdTwg6K0nerJgJ15X2EW08sjMBx8qPibgIrYEZBbyPVEok6a7WdkQwfCI9DY+aOdYvMD6KZkUjwgIKAqdshtaeI3bJ4YCI/AsPuypO+CmpLrgW6UJOQJS6Ukk/c668P+4jJsID0Cwjobw/6pZFl8YIAU11iBonqM2f+Ymw3/NdcF/3c8lDHoPGJ/MO2/+pogMFvJX/83A65SjZWXvS/sRNm34EsV/+WWev0H0YPFI4EXysBuCr1S9R/kRm4p/k58SYtDxkn9Bkij89Hs/6qr/cExNNAeAblBdZX/f8fDkFQiYal0m1AeAQFNwyIXcJ2huzH8v9mu+AH3iMWuxP/aG0LBbKMS1684kxQ6YBfgzPPblvsp/FrNf4Xl3v+9ThYMmEf8zpX8l1vm9T/yet1/3605X4DOKyTKE7AkJqInfSTmat0PkCeUVvqCDaK3R0B2KqzwAQckqC4R1pE6TYonYEBSM84CXCGa7Ij5b7gtiu4e0d8SAU/awArxO9BNAuR4hIFTlCfcfWnSV1BmU1rh99/1WA7dPOJ2LBdsJyhWQJUz0DkBZHkCBnjlhVdHnq36Dk6r0OKP5q1fYN6UXeIBLnKjr9T9BAboSoo8AQUciv76z0CW2uxP+a+3LuyPiIH0Q1p5BGz2+rA/ILtA8nJuWi8ZyE1SWICTdWfQN+ue4M/cqkLzQXxaeQRotge7GHeX/aTwL7Z9ob8Y8DRFyAWFSIbS0iMwO7yAOJPankAH9PAIXcCoR0Y9MuqRUY+MemTUI6MeGfXIqEdGPTLqkaHnEVpNvdHbIwIM1J8IhWGq9c9HwSigEAAAOjWHGlbNBk8AAAAASUVORK5CYII=",

							"Tottenham":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACQklEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ5JIaaZjUlcP1znPflPLF7TzEsUrk/k+p8dxPFdQohpAcguWnnCylqX9eGVRYJfQZaS4pEXG4WIwjAPXV0s+MXZmO0J0E5NqvqAn5eptCOd6yeyhbT0CIj9bIPQ74l53N/5eJhqqeEHRSdj1pNHpwl8RbeQ1h6B4bNzBb6pyzEfAbmFXE8k5gRzfMZlIb08AsJP1wv9yQrk+AF0UzIpHhAAhsChda283/BZSE+PwPCGNt7vOkrM64FulCTkCctwJ/bXD1YL/iRk4UB4BISfrBP6m+jN8YYBUlxjBYqJXhxEWzhQHoHhYAe23wy4SjVebqa+y4sEcSapweIRkBtlRJg68SUtDnczthuD3SO2+qy3CeURENCsjOEctHmkOo7zK84khQ4E+JjyDk7h/zTYPLJ/Ev8XoPMKifIELIkZqLEcebhG8Mdg8QioLtFTZjlNiidgQDLVl31QVIggnAVsTIISCzkeYRAVYg5f38r3daA9Aqqcgc4JIMsTMKAoybz61jLB7wPlEVDlLC7ItJIiT0ABR7A9+zOYwaAy3Eid9SGtPAIyG7ku87RgfclAbpLCApwm5nN/m1zA8xnUsQLxaeURoNkewIq5bXYZ95fpxdy/GPA0RcgFhUiG0tIjMDu8gDiT2p5AB/TwCF3AqEdGPTLqkVGPjHpk1COjHhn1yKhHRj0y6pHh7RFSpt7o7REBBupPhMIw1frno2AUUAgAkMrFGlr4lU8AAAAASUVORK5CYII=",

							"ManUnited":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACPklEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ4RVqaZWZKsP37eYPxPLO5TYicKZ0qy/o8QY/kuzMq0AGQXrTxhZcjN9HC9FudXkKWkeGS/HhdRGOahDVqcX8x5mZ8A7dSkqg94mRhKC6TZfiJbSEuPgNh79bh+l8uyfedhYqilhh8UgSFzcpE6x1d0C2ntERheqcH5TZGD8QjILeR6IjFSlOUzLgvp5REQ3qPH9SdclOUH0E3JpHhAABgChyYosX/DZyE9PQLDE5XZv6twMq4HulGSkCcsPQSZX+/Q4fxJyMKB8AgI79bl+hsgzPKGAVJcYwWKQAVEWzhQHoFhVwGW3wy4SjVuJoa+dZqcOJPUYPEIyI1ibEyd+JIWhxUfy43B7hEjHqbbhPIICGgmS7AO2jySKsH6FWeSQgd8TAx589U4Pg02j8xT4/gCdF4hUZ6AJTENTuYjO3U4fwwWj4DqEnVO5tOkeAIGJINFBkeFCMIRoizfgW4SIMcjDELMDOETldi/DrRHQJUz0DkBZHkCBqTZGFdv0eb8PlAeAVXOQqxMKynyBBRwuAoyP4MZDCrDNbmYHtLKIyCzkesyGz7mlwzkJikswAnYpP5WKcv2GdSxAvFp5RGg2R7AirmtQY7tS40c2y8GPE0RckEhkqG09AjMDi8gzqS2J9ABPTxCFzDqkVGPjHpk1COjHhn1yKhHRj0y6pFRj4x6ZHh7hJSpN3p7RICB+hOhMEy1/vkoGAUUAgDpfjPP6X14KgAAAABJRU5ErkJggg==",

							"Newcastle":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACU0lEQVRogWNgGAWjYBSMglEwCkYBRcANiIuB2InKOBeI/ejhAQ5mIfaZ/ImKPxTDVP6bxeiBsWq+7n+RJh0wBrHJFQeZyRMk851ZiG0ByC5aecKKXYf/oeQCs68gB4AsjjQ3AGOrYrP/0uutwRjEJlccZCbIbMmFZl84jASfAO3UpKoPmHhZSvnTlH/CLKe1R0DiUuusfwvmqn5n4mGppYYfFDkMBU6KTzX6CrOYXh6BYYnZJt9Y5LiOgNxCricSeYOkPyMbOhAeAcfOWus/PAHSP4BuSibFAwIsctyHRFt0v2HzxEB4BIZFW3S+syjxrAe6UZKQJyy5nMReS620/InLsIH0CDh21lj95faUfMMAKa6xAkWgAryGDAaPwDCXvehvBlylGhM3Sx+weMWZpAaLR0BuZBFh78SXtDg4TIVuDHaPsOvy3yaUR0BAky9aftDmEf5Y+a84kxRGEuNjzRObaPRpsHlEbILhF6DzConyBCyJsarwHpFaZfVjsHgEVJewKnOfJsUTMCDJ4yM5KCpEEOYJlP4OdJMAOR5hALZCw4EV49eB9giocgY6J4AsT8AAiyTnaqklFt8HyiOgyplZkG0lRZ6AAg4uO9FnyGU4myrPQ1p5BGQ2cl3GaSH8koHcJIUFOAnmqX4TzFf7DOpYgfi08gjQbA9gxdwmVKrxRbBQ7RcDnqYIuaAQyVBaegRmhxcQZ1LbE+iAHh6hCxj1yKhHRj0y6pFRj4x6ZNQjox4Z9cioR0Y9MvQ8QqupN3p7RICB+hOhMEy1/vkoGAUUAgDkKKOIU8UhfwAAAABJRU5ErkJggg=="
							}
					
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
					
					tableData = service.createTable(roundsData, 1, 3, shirtsArray);	// createTable()		
							
				});
				
				it('mancity should have 3 wins considering the data', function () {
					expect(tableData[0]["wins"]).toEqual(3); });
					
				it('It should come up with 8 teams, given the data', function () {
					expect(tableData.length).toEqual(8);});
			
				it('Second team in array should be Chelsea', function () {
					expect(tableData[1]["name"]).toEqual("Chelsea");});
				
				it('Correct shirt has to be assigned to the relevant field.', function() {
					expect(tableData[1]["shirt"]).toEqual(shirtsArray["Chelsea"]);
				});
			});	
	
	
	});



});


describe('eplApp controllers,', function () {

	beforeEach(module('eplApp'));
	it('test', function () {
		expect(true).toBe(true);	
	})
	
	describe('TableCtrl,', function () {
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
