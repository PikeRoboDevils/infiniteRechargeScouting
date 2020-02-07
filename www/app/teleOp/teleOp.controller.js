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
			// switchCube: 0,
            powerCellsDropped: 0,
            bottomPort: 0,
            innerPort: 0,
            outerPort: 0,
            positionControl:false,
            rotationControl: false,
            stage1: false,
            stage2: false,
            stage3: false,

			// scaleCube: 0,
            total: 0,
            // vaultPoints: 0,
            // climbPoints: 0,
            parking: 0,
            // exchangeCube: 0,
            // vaultCube: 0,
            // outPortal: 0,
            levelPoints: 0,
            // outExchange: 0,
            disabled: 0,
			climbSuccess: false,
			climbAttempt: false,
            
			climbPosition: {
					id: 0,
					label: 'None',
					value: 'NONE'
				},
			playStyle: {
				id: 1,
				label: 'Offensive',
				value: 'OFFENSIVE'
				},
            // powerUp: {
            //     id: 2,
            //     label: 'None',
            //     value: 'NONE'
            // },

            foul: {
            	id: 5,
                label: 'None',
                value: 'NONE'
            }
            
			};

		vm.climbPositions = [
			{
				id: 0,
				label: 'None',
				value: 'NONE'
			},
			{
				id: 1,
				label: 'Outside',
				value: 'OUTSIDE'
			},
			{
				id: 2,
				label: 'Middle',
				value: 'MIDDLE'
			}
		];
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
			vm.decreaseInnerPort1 = decreaseinnerPort1;
			vm.toggleRotationControl = toggleRotationControl;
			vm.togglePositionControl = togglePositionControl;
			vm.toggleStage1 = toggleStage1;
			vm.toggleStage1 = toggleStage2;
			vm.toggleStage1 = toggleStage3;
			// vm.increaseSwitchCube1 = increaseSwitchCube1;
			// vm.decreaseSwitchCube1 = decreaseSwitchCube1;
			// vm.increaseScaleCube1 = increaseScaleCube1;
			// vm.decreaseScaleCube1 = decreaseScaleCube1;
			vm.toggleclimbSuccess = toggleclimbSuccess;
            vm.decreasePowerCellsDropped1 = decreasePowerCellsDropped1;
            vm.increasePowerCellsDropped1 = increasePowerCellsDropped1;
			// vm.increaseExchangeCube1 = increaseExchangeCube1;
			// vm.decreaseExchangeCube1 = decreaseExchangeCube1;
			// vm.increaseVaultCube1 = increaseVaultCube1;
   //          vm.decreaseVaultCube1 = decreaseVaultCube1;
   //          vm.increaseOutPortal1 = increaseOutPortal1;
   //          vm.decreaseOutPortal1 = decreaseOutPortal1;
   //          vm.increaseOutExchange1 = increaseOutExchange1;
   //          vm.decreaseOutExchange1 = decreaseOutExchange1;
            vm.toggleClimbAttempt = toggleClimbAttempt;
            vm.toggleDisabled = toggleDisabled;
            vm.toggleLevelPoints = toggleLevelPoints;
            vm.didClimb = didClimb;
            vm.validClimbPos = validClimbPos;

			init();

			function init() {
				console.log(vm.match);
			}
			function decreasedBottomPort1() {
				if (vm.matchParts.bottomPort - 1 >= 0) {
					vm.matchParts.bottomPort -= 1;

				}
			}
			function increasedBottomPort1() {
				vm.matchParts.bottomPort+= 1;
			}
			function decreasedInnerPort1() {
				if (vm.matchParts.innerPort - 1 >= 0) {
					vm.matchParts.innerPort -= 1;

				}
			}
			function increasedInnerPort1() {
				vm.matchParts.innerPort+= 1;
			}
			function decreasedOuterPort1() {
				if (vm.matchParts.outerPort - 1 >= 0) {
					vm.matchParts.outerPort -= 1;

				}
			}
			function increasedOuterPort1() {
				vm.matchParts.outerPort+= 1;
			}

			// function decreaseSwitchCube1() {
			// 	if(vm.matchParts.switchCube - 1 >= 0) {
			// 		vm.matchParts.switchCube -= 1;
			// 	}
        
            function decreasepowerCellsDropped1() {
				if(vm.matchParts.powerCellsDropped - 1 >= 0) {
					vm.matchParts.powerCellsDropped -= 1;
				}
			}
        
            function increasepowerCellsDropped1() {
				vm.matchParts.powerCellsDropped += 1;
			}
        

			// function increaseSwitchCube1() {
			// 	vm.matchParts.switchCube += 1;
			// }
        
        
   //          function decreaseExchangeCube1() {
			// 	if(vm.matchParts.exchangeCube - 1 >= 0) {
			// 		vm.matchParts.exchangeCube -= 1;
			// 	}
			// }
        
   //          function increaseExchangeCube1() {
			// 	vm.matchParts.exchangeCube += 1;
			// }
            
   //      //makes sure that user can't exceed past 9 cubes delivered to the vault
			// function increaseVaultCube1() {
   //              if (vm.matchParts.vaultCube - 8 <= 0) {
			// 	vm.matchParts.vaultCube += 1;
   //              }
			// }
        
   //          function decreaseVaultCube1() {
			// 	if(vm.matchParts.vaultCube - 1 >= 0) {
			// 		vm.matchParts.vaultCube -= 1;
			// 	}
			// }

			// function decreaseScaleCube1() {
			// 	if(vm.matchParts.scaleCube - 1 >= 0) {
			// 		vm.matchParts.scaleCube -= 1;
			// 	}
			// }

			// function increaseScaleCube1() {
			// 	vm.matchParts.scaleCube += 1;
			// }

			// function increaseOutPortal1() {
			// 	vm.matchParts.outPortal += 1;
			// }

			// function decreaseOutPortal1() {
			// 	if(vm.matchParts.outPortal - 1 >= 0) {
			// 		vm.matchParts.outPortal -= 1;
			// 	}
			// }

			// function increaseOutExchange1() {
			// 	vm.matchParts.outExchange += 1;
			// }

			// function decreaseOutExchange1() {
			// 	if(vm.matchParts.outExchange - 1 >= 0) {
			// 		vm.matchParts.outExchange -= 1;
			// 	}
			// }

            function hasClimbed(){
            	return vm.matchParts.climbSuccess;
            }

            function didClimb(){
            	if(!hasClimbed()) {
            		vm.matchParts.climbPosition = {
            			id: 0,
					label: 'None',
					value: 'NONE'
				};
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
					// vaultPoints: vm.matchParts.vaultPoints,
					climbPoints: vm.matchParts.climbPoints,
					total: vm.matchParts.total,
					parking: vm.matchParts.parking,
					climbSuccess: vm.matchParts.climbSuccess,
					climbAttempt: vm.matchParts.climbAttempt,
					playStyle: vm.matchParts.playStyle.value,
                    foul: vm.matchParts.foul.value,
                    breakdown: vm.matchParts.breakdown,
                    bottomPortTotal: vm.matchProperties.bottomPort,
					outerPortTotal: vm.matchProperties.outerPort,
					innerPortTotal: vm.matchProperties.innerPort,
                    dropped: vm.matchProperties.powerCellsDropped,
                    //powerUp: vm.matchParts.powerUp.value,
                    // switchCube: vm.matchParts.switchCube,
                    // scaleCube: vm.matchParts.scaleCube,
                    // exchangeCube: vm.matchParts.exchangeCube,
                    // vaultCube: vm.matchParts.vaultCube,
                    // outExchange: vm.matchParts.outExchange,
                    // outPortal: vm.matchParts.outPortal,
                    level: vm.matchParts.levelPoints
				};

               
           //     teleScore.vaultPoints = (vm.matchParts.vaultCube * MatchSvc.constants.TELE_VAULT_CUBE_CONSTANT);
                
				teleScore.climbPoints += vm.matchParts.climbSuccess ? MatchSvc.constants.CLIMB_CONSTANT : 0;
                
				teleScore.parking = (vm.matchParts.parking * MatchSvc.constants.TELE_PARKING_CONSTANT);
                
                teleScore.level = vm.matchParts.levelPoints;

				teleScore.total = teleScore.vaultPoints + teleScore.climbPoints + teleScore.parking + teleScore.levitation;
                
                teleScore.fouls = teleScore.foul;
                
                teleScore.cubes = (teleScore.switchCube + teleScore.scaleCube);
                
               // teleScore.extraCubes = teleScore.exchangeCube + teleScore.vaultCube;
                
                //these cubes are left over, maybe put in another category?: teleScore.outPortal + teleScore.outExchange

				vm.match.teleScore = teleScore;
				MatchSvc.updateMatch(vm.match);
                console.log(vm.match.teleScore);
				$state.go('results');
               // console.log(teleScore.total);
               // console.log("telescore vault points: " + teleScore.vaultPoints);
                
			}

			function toggleclimbSuccess(){
				vm.matchParts.climbSuccess = !vm.matchParts.climbSuccess;
				didClimb();
			}

			function toggleClimbAttempt(){
				vm.matchParts.climbAttempt = !vm.matchParts.climbAttempt;
			}
        
            function toggleLevelPoints(){
                vm.matchParts.levelPoints = 15;
                
            }
        
            function toggleDisabled(){
                vm.matchParts.disabled = !vm.matchParts.disabled;
            }

	}
})();
