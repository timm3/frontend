appCtrls.controller('SignupCtrl', ['$scope', '$location', 'SignUpService',
	function($scope, $location, SignUpService) {
	
	/* inputs */
	$scope.inputs = new Inputs();

	$scope.cancel = function(){
			$scope.inputs.userName = null;
			$scope.inputs.email = null;
			$scope.inputs.password = null;
			$scope.inputs.confPassword = null;
			$scope.inputs.netId = null;
			$scope.inputs.adPassword = null;
			$scope.inputs.confAdPassword = null;
	};
	$scope.submit = function(){
		SignUpService.submit({
			'userName':$scope.inputs.userName,
			'email':$scope.inputs.email,
			'password':$scope.inputs.password,
			'netId':$scope.inputs.netId,
			'adPassword':$scope.inputs.adPassword
		})
	};

	$scope.validateUserName = function(value, type, pristine){
		var error = "";
	    var illegalChars = /\W/; // allow letters, numbers, and underscores
		var re = new RegExp(illegalChars);
		if(pristine){
			$scope.inputs.netIdError = null;
		    $scope.inputs.userNameError = null;
		    return true;
		}
		//if an error is found, set error variable
	    if (!value || value === "" || value === null) {
	    	if(type=="username"){
	    		$scope.inputs.userNameError = "You didn't enter a " + type + ".\n";
	    	}
 	    	if(type=="netid"){
 	    		$scope.inputs.netIdError = null;
 	    		return true;
 	    	}
	    	return false;
	    } else if (value.length < 5) {
	    	if(type=="username"){
	    		$scope.inputs.userNameError = "Your " + type + " is too short. Please use more than 4 characters.\n";
	    	}
	    	if(type=="netid"){
	    		$scope.inputs.netIdError = "Your " + type + " is too short. Please use more than 4 characters.\n";
	    	}
	    	return false;
	    } else if (value.length > 32) {
	    	if(type=="username"){
	    		$scope.inputs.userNameError = "Your " + type + " is too long. Please stay under 33 characters.\n";
	    	}
	    	if(type=="netid"){
	    		$scope.inputs.netIdError = "Your " + type + " is too long. Please stay under 33 characters.\n";
	    	}
	    	return false;
	    } else if (re.test(value)) {
	    	if(type=="username"){
	    		$scope.inputs.userNameError = "Your " + type + " contains illegal characters.\n";
	    	}
	    	if(type=="netid"){
	    		$scope.inputs.netIdError = "Your " + type + " contains illegal characters.\n";
	    	}
	    	return false;
	    } 
	    $scope.inputs.netIdError = null;
	    $scope.inputs.userNameError = null;
	    return true;
	}
	$scope.validEmail = function(value, pristine) {
		//should the email field be passed in or assumed?
		//var fld = document.getElementById('inputEmail3');
		var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
		//' this comment and tic are to fix editor highlighting
		var re = new RegExp(regex);
		
	    var badColor = "#ff6666";
		if(pristine){
			$scope.inputs.emailError = null;
			return true;
		}
		//find reasons to flag for error and set error message
		if (value == null) {
			$scope.inputs.emailError = "You didn't enter an email address.\n";
			return false;
	    } else if(!re.test(value)) {
			$scope.inputs.emailError = "Please enter a valid email.\n";
			return false;
		}
		$scope.inputs.emailError = null;
		return true;
	}

	$scope.checkPass = function(confPass, pristine, type){

		if(pristine){
			return true;
		}
		if(type=="pass") {
			if(confPass == $scope.inputs.password){
		        //The passwords match. 
		        //the user that they have entered the correct password 
				$scope.inputs.passwordError = "Passwords Match! \n";
		        return true;
		    }else if(!(confPass == "")){
		        //The passwords do not match.
		        //notify the user.
				$scope.inputs.passwordError = "Passwords Do Not Match! \n";
		        return false;
		    }	
		    return false;
		} 
		if(type=="adPass") {
			if(confPass == $scope.inputs.adPassword){
		        //The passwords match. 
		        //the user that they have entered the correct password 
				$scope.inputs.adPasswordError = "AD Passwords Match! \n";
		        return true;
		    }else if(!(confPass == "")){
		        //The passwords do not match.
		        //notify the user.
				$scope.inputs.adPasswordError = "AD Passwords Do Not Match! \n";
		        return false;
		    }	
		    return false;
		}
		return true;
	}  

}]);

function Inputs(){
	this.userName = null;
	this.userNameError = null;
	this.email = null;
	this.emailError = null;
	this.password = null;
	this.confPassword = null;
	this.passwordError = null;
	this.netId = null;
	this.netIdError = null;
	this.adPassword = null;
	this.confAdPassword = null;
	this.adPasswordError = null;
	
}
