appCtrls.controller('ProfileCtrl', ['$scope',
	'$http', 
	'$location',
	'ClassPageService',
	'SaveClassInfo',
	function($scope, $http, $location, ClassPageService, SaveClassInfo) {
		// $scope.accountDetails = accountDetails();
		$scope.saveInfo = SaveClassInfo;
		$scope.netid;
		$scope.classesAdded = $scope.saveInfo.getClassesAdded();
		$scope.crns = [];
		for(var courseAdded in $scope.classesAdded){
			addToCalendar($scope.classesAdded[courseAdded]);
			if($scope.crns.length === 0){
				$scope.crns.push($scope.classesAdded[courseAdded].crn);
			}
			else{
				if($scope.crns.indexOf($scope.classesAdded[courseAdded].crn) === -1){
					$scope.crns.push($scope.classesAdded[courseAdded].crn);
				}
			}
		}
		$scope.register = function(netId){
			var url = 'http://illiniregnow.com:9292/register?netid='+netId +"&crns=";
			for(var i=0; i< $scope.crns.length; i++){
				console.log(typeof i);
				if(i+1 === $scope.crns.length){
					url+= $scope.crns[i];
				}
				else{
					url+= $scope.crns[i]+",";
				}
			}
			if($scope.crns.length > 0){
				$http.post(url).success(function(data, status, headers, config){
						alert(data);
					})
					.error(function(data, status, headers, config){
						console.log("error func: retrieval failed");
				});
			}
		};
}]);
