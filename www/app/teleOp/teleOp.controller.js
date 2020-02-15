(function() {
	'use strict';
	angular
	.module('steamWorks')
	.controller('teleOpCtrl', teleOpCtrl, '$state');

	teleOpCtrl.$inject = ['MatchSvc', '$scope', '$state'];

	function teleOpCtrl(MatchSvc, $scope, $state){
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});
		
		var vm = this;

		vm.match = MatchSvc.getMatch();
        
		vm.submit = submit;

		vm.matchParts	=	{
            powerCellsDropped: 0,
            bottomPort: 0,
            innerPort: 0,
            outerPort: 0,

            positionControl: 0,
            rotationControl: 0,

            //total: 0,

            parking: 0,

            levelPoints: 0,

            disabled: 0,
			climbSuccess: false,
			climbAttempt: false,
			climbPoints: 0,
            
			playStyle: {
				id: 1,
				label: 'Offensive',
				value: 'OFFENSIVE'
				},


            foul: {
            	id: 5,
                label: 'None',
                value: 'NONE'
            }
            
			};
			// climbPosition: {
			// 		id: 0,
			// 		label: 'None',
			// 		value: 'NONE'
			// 	},
   //          powerUp: {
   //              id: 2,
   //              label: 'None',
   //              value: 'NONE'
   //          },
		// vm.climbPositions = [
		// 	{
		// 		id: 0,
		// 		label: 'None',
		// 		value: 'NONE'
		// 	},
		// 	{
		// 		id: 1,
		// 		label: 'Outside',
		// 		value: 'OUTSIDE'
		// 	},
		// 	{
		// 		id: 2,
		// 		label: 'Middle',
		// 		value: 'MIDDLE'
		// 	}
		// ];
		vm.playStyles = [
			{
				id: 1,
				label: 'Offensive',
				value: 'OFFENSIVE'
			},
			{
				id: 2,
				label: 'Defensive',
				value: 'DEFENSIVE'
			}
		];
		vm.fouls = [
			{
				id: 1,
				label: 'Foul',
				value: 'FOUL'
			},
			{
				id: 2,
				label: 'Technical Foul',
				value: 'TECH'
			},
			{
				id: 3,
				label: 'Yellow Card',
				value: 'YELLOW CARD'
			},
			{
				id: 4,
				label: 'Red Card',
				value: 'RED CARD'
			},
			{
				id: 5,
				label: 'None',
				value: 'NONE'
			}
		];

			 vm.increaseBottomPort1 = increaseBottomPort1;
			 vm.decreaseBottomPort1 = decreaseBottomPort1;
			vm.increaseOuterPort1 = increaseOuterPort1;
			vm.decreaseOuterPort1 = decreaseOuterPort1;
			vm.increaseInnerPort1 = increaseInnerPort1;
			vm.decreaseInnerPort1 = decreaseInnerPort1;
			vm.toggleRotationControl = toggleRotationControl;
			vm.togglePositionControl = togglePositionControl;
			vm.toggleclimbSuccess = toggleclimbSuccess;
            vm.decreasePowerCellsDropped1 = decreasePowerCellsDropped1;
            vm.increasePowerCellsDropped1 = increasePowerCellsDropped1;
            vm.toggleClimbAttempt = toggleClimbAttempt;
            vm.toggleParking = toggleParking;
            vm.toggleDisabled = toggleDisabled;
            vm.toggleLevelPoints = toggleLevelPoints;
            vm.didClimb = didClimb;
            vm.validClimbPos = validClimbPos;
           
			init();

			function init() {
				console.log(vm.match);
			}
			function decreaseBottomPort1() {
				if (vm.matchParts.bottomPort - 1 >= 0) {
					vm.matchParts.bottomPort -= 1;

				}
			}
			function increaseBottomPort1() {
				vm.matchParts.bottomPort+= 1;
			}
			function decreaseInnerPort1() {
				if (vm.matchParts.innerPort - 1 >= 0) {
					vm.matchParts.innerPort -= 1;

				}
			}
			function increaseInnerPort1() {
				vm.matchParts.innerPort+= 1;
			}
			function decreaseOuterPort1() {
				if (vm.matchParts.outerPort - 1 >= 0) {
					vm.matchParts.outerPort -= 1;

				}
			}
			function increaseOuterPort1() {
				vm.matchParts.outerPort+= 1;
			}

        
            function decreasePowerCellsDropped1() {
				if(vm.matchParts.powerCellsDropped - 1 >= 0) {
					vm.matchParts.powerCellsDropped -= 1;
				}
			}
        
            function increasePowerCellsDropped1() {
				vm.matchParts.powerCellsDropped += 1;
			}

			function toggleRotationControl(){
				if(vm.matchParts.rotationControl == 0){
					vm.matchParts.rotationControl = 10;
				}
				else {
					vm.matchParts.rotationControl = 0;
				}
			}

			function togglePositionControl(){
				if (vm.matchParts.positionControl == 0){
					vm.matchParts.positionControl = 20;
				}
				else {
					vm.matchParts.positionControl = 0;
				}
			}

            function hasClimbed(){
            	return vm.matchParts.climbSuccess;
            }

            function didClimb(){
            	if(!hasClimbed()) {
            		climbPoints = 25;
    //         		vm.matchParts.climbPosition = {
    //         			id: 0,
				// 	label: 'None',
				// 	value: 'NONE'
				// };
            	}
            }

          function validClimbPos() {
            	var answer = true;
            	if(vm.matchParts.climbSuccess){
            		if(vm.matchParts.climbPosition.value === 'NONE') {
            			answer = false;
            		}
            	}


            	return answer;
            } 

			function submit() {
				var teleScore = {
					
					climbPoints: vm.matchParts.climbPoints,
					//total: 0,
					//controlPanel: 0,
					parking: vm.matchParts.parking,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					playStyle: vm.matchParts.playStyle.value,
                    foul: vm.matchParts.foul.value,
                    disabled: vm.matchParts.disabled,
                    bottomPortTotal: vm.matchParts.bottomPort,
					outerPortTotal: vm.matchParts.outerPort,
					innerPortTotal: vm.matchParts.innerPort,
                    dropped: vm.matchParts.powerCellsDropped,

                    level: vm.matchParts.levelPoints,
                    rotationControlPoints: vm.matchParts.rotationControl,
                    positionControlPoints: vm.matchParts.positionControl,
					
					// vaultPoints: vm.matchParts.vaultPoints,
                    //powerUp: vm.matchParts.powerUp.value,
                    // switchCube: vm.matchParts.switchCube,
                    // scaleCube: vm.matchParts.scaleCube,
                    // exchangeCube: vm.matchParts.exchangeCube,
                    // vaultCube: vm.matchParts.vaultCube,
                    // outExchange: vm.matchParts.outExchange,
                    // outPortal: vm.matchParts.outPortal,
				};

               
           //     teleScore.vaultPoints = (vm.matchParts.vaultCube * MatchSvc.constants.TELE_VAULT_CUBE_CONSTANT);
                
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;
                
				teleScore.parking = vm.matchParts.parking;
                
                teleScore.level = vm.matchParts.levelPoints;

                teleScore.controlPanel = teleScore.rotationControlPoints + teleScore.positionControlPoints;
				
				teleScore.telePowerCells = teleScore.bottomPortTotal + 2*teleScore.outerPortTotal + 3*teleScore.innerPortTotal;
				
				teleScore.total = teleScore.climbPoints + teleScore.parking + teleScore.level + teleScore.controlPanel + teleScore.telePowerCells; 
                
                teleScore.fouls = teleScore.foul;
                
                //teleScore.powerCells = teleScore.bottomPortTotal + teleScore.outerPortTotal + teleScore.innerPortTotal - teleScore.dropped;
                
               // teleScore.cubes = (teleScore.switchCube + teleScore.scaleCube);
                
               // teleScore.extraCubes = teleScore.exchangeCube + teleScore.vaultCube;
                
                //these cubes are left over, maybe put in another category?: teleScore.outPortal + teleScore.outExchange

				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
                console.log(vm.match.teleScore);
				$state.go('results');
               // console.log(teleScore.total);
               // console.log("teleScore vault points: " + teleScore.vaultPoints);
                
			}

			function toggleclimbSuccess(){
				vm.matchParts.climbSuccess = !vm.matchParts.climbSuccess;
				didClimb();
			}

			function toggleClimbAttempt(){
				vm.matchParts.climbAttempt = !vm.matchParts.climbAttempt;
			}
        
            function toggleLevelPoints(){
            	if (vm.matchParts.levelPoints == 0){
            		vm.matchParts.levelPoints = 15;
            	}
            	else {
            		vm.matchParts.levelPoints = 0;
            	}
            }

            function toggleParking(){
            	if (vm.matchParts.parking == 0){
            		vm.matchParts.parking = 5;
            	}
            	else {
            		vm.matchParts.parking = 0;
            	}
            }
        
            function toggleDisabled(){
                vm.matchParts.disabled = !vm.matchParts.disabled;
            }

	}
})();
