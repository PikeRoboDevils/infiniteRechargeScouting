(function() {
	'use strict';
	angular
		.module('steamWorks')
		.controller('autoCtrl', autoCtrl);

		autoCtrl.$inject = ['MatchSvc', '$scope', '$state'];

		function autoCtrl(MatchSvc, $scope, $state) {
			$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
			    viewData.enableBack = true;
			});
			
			var vm = this;
        
			vm.match = MatchSvc.getMatch();
            vm.submit = submit;
           

			vm.matchProperties = {
				bottomPort: 0,
				outerPort: 0,
				innerPort: 0,
				powerCellsDropped: 0,
				autoRun: false,

				placement: {
					id: 0,
					label: 'None',
					value: 'NONE'
				}
			}

			vm.startingPositions = [
				{
					id: 0,
					label: 'None',
					value: 'NONE'
				},
				{
					id: 1,
					label: 'Left',
					value: 'LEFT'
				},
				{
					id: 2,
					label: 'Center',
					value: 'CENTER'
				},
				{
					id: 3,
					label: 'Right',
					value: 'RIGHT'
				}
			];

			vm.decreaseBottomPort1 = decreaseBottomPort1;
			vm.increaseBottomPort1 = increaseBottomPort1;
			vm.decreaseOuterPort1 = decreaseOuterPort1;
			vm.increaseOuterPort1 = increaseOuterPort1;
			vm.decreaseInnerPort1 = decreaseInnerPort1;
			vm.increaseInnerPort1 = increaseInnerPort1;
			vm.decreasePowerCellsDropped1 = decreasePowerCellsDropped1;
			vm.increasePowerCellsDropped1 = increasePowerCellsDropped1;
			vm.toggleAutoRun = toggleAutoRun;
            vm.validStartingPos = validStartingPos;

            init();

			function init() {
				console.log(vm.match);
			}

			function decreaseBottomPort1() {
				if (vm.matchProperties.bottomPort - 1 >= 0) {
					vm.matchProperties.bottomPort -= 1;
				}
			}

			function increaseBottomPort1() {
				vm.matchProperties.bottomPort += 1;
			}

			function decreaseOuterPort1() {
				if (vm.matchProperties.outerPort - 1 >= 0) {
					vm.matchProperties.outerPort -= 1;
				}
			}

			function increaseOuterPort1() {
				vm.matchProperties.outerPort += 1;
			}

			function decreaseInnerPort1() {
				if (vm.matchProperties.innerPort - 1 >= 0) {
					vm.matchProperties.innerPort -= 1;
				}
			}

			function increaseInnerPort1() {
				vm.matchProperties.innerPort += 1;
			}

			function decreasePowerCellsDropped1() {
				if(vm.matchProperties.powerCellsDropped - 1 >= 0) {
					vm.matchProperties.powerCellsDropped -= 1;
				}
			}

			function increasePowerCellsDropped1() {
				vm.matchProperties.powerCellsDropped += 1;
			}

			function validStartingPos() {
            	var answer = true;
            	if(vm.matchProperties.gears >= 1){
            		if(vm.matchProperties.placement.value === 'NONE') {
            			answer = false;
            		}
            	}


            	return answer;
            }

			function submit() {
				var autoScore = {
					bottomPortTotal: vm.matchProperties.bottomPort,
					outerPortTotal: vm.matchProperties.outerPort,
					innerPortTotal: vm.matchProperties.innerPort,
                    dropped: vm.matchProperties.powerCellsDropped,
					total: 0,
					autoRunPoints: vm.matchProperties.autoRun,
					placement: vm.matchProperties.placement.value
				};

				autoScore.autoRunPoints = vm.matchProperties.autoRun ? MatchSvc.constants.AUTOLINE_CONSTANT : 0;
			
				autoScore.total = autoScore.autoRunPoints;
            
                //autoScore.cubes = autoScore.switchPoints + autoScore.scalePoints + autoScore.exchangePoints + autoScore.dropped;
                //autoScore.powerCells = autoScore.bottomPortTotal + autoScore.outerPortTotal + autoScore.innerPortTotal - autoScore.dropped;
                autoScore.autoPowerCells = 2*autoScore.bottomPortTotal + 4*autoScore.outerPortTotal + 6*autoScore.innerPortTotal;
				vm.match.autoScore = autoScore;
				MatchSvc.updateMatch(vm.match);
				$state.go('teleOp');
                //console.log(vm.match);
			}

			function toggleAutoRun(){
				vm.matchProperties.autoRun = !vm.matchProperties.autoRun;
			}
         	
		}     
})();
