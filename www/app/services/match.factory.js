(function() {
	'use strict';

	angular
		.module('steamWorks')
		.factory('MatchSvc', MatchSvc);

	MatchSvc.$inject = [];

	function MatchSvc() {
	
	   
	    var calcs = {
	    	AUTO_BOTTOM: 2,
	    	AUTO_OUTER: 4,
	    	AUTO_INNER: 6,
	    	TELE_BOTTOM: 1,
	    	TELE_OUTER: 2,
	    	TELE_INNER: 3,
	    	POSITION: 20,
	    	ROTATION: 10,
	    	LEVEL: 15,
	    	//TELE_VAULT_CUBE_CONSTANT: 5,
	    	TELE_PARKING_CONSTANT: 5,
			CLIMB_CONSTANT: 25,
			//AUTOLINE_CONSTANT: 5
	    };

	    var match = {

        };

		this.reset = function(){

		};

		var matchSvc = {
				beginMatch: beginMatch,
				getMatch: getMatch,
				updateMatch: updateMatch,
				constants: calcs
			};

		return matchSvc;

		function getMatch() {

			return match;
		}

		function beginMatch() {
			angular.copy([], match);
			
		}

		function updateMatch(newProperties) {
			match = _.merge(match, newProperties);
		}
	}
})();
