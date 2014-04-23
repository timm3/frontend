appCtrls.controller('ProfileCtrl', ['$scope', 
	'$location',
	'ClassPageService',
	'SaveClassInfo',
	function($scope, $location, ClassPageService, SaveClassInfo) {
		$scope.accountDetails = accountDetails();
		$scope.saveInfo = SaveClassInfo;
		$scope.classesAdded = $scope.saveInfo.getClassesAdded();
		for(var courseAdded in $scope.classesAdded){
			console.log($scope.classesAdded[courseAdded]);
			addToCalendar($scope.classesAdded[courseAdded]);
		}

		$scope.cancel = function(){
			$scope.accountDetails.userName = null;
			$scope.accountDetails.email = null;
			$scope.accountDetails.password = null;
			$scope.accountDetails.confirmPassword = null;
			$scope.accountDetails.netId = null;
			$scope.accountDetails.adPassword = null;
			$scope.accountDetails.confirmAd = null;
		}
}]);

function accountDetails(){
	this.userName = null;
	this.email = null;
	this.password = null;
	this.confirmPassword = null;
	this.netId = null;
	this.adPassword = null;
	this.confirmAd = null;

	this.resetDetails = function(){
		userName = null;
		email = null;
		password = null;
		confirmPassword = null;
		netId = null;
		adPassword = null;
		confirmAd = null;
	}
}