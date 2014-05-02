'use strict';

/* Services */

var appServices = angular.module('RegNow.services', []);

//Simple service to help with searching.
appServices.service("mySearch", function(){
	var searchInput = null;

	this.setSearch = function(search){
		searchInput = search;
	};
	this.getSearch = function(){
		return searchInput;
	};
});

appServices.service("SignUpService", function($http){
	this.submit = function(data){
		$http.post('/signupInfo',{
			'info':data
			}).success(function(data, status, headers, config){
				if(data.success){
					extractFilteredInfo(data.filteredClasses);
					// console.log(data.filteredClasses);
				}
				else{
					console.log("Retrieval failed");
				}
			})
			.error(function(data, status, headers, config){
				console.log("error func: retrieval failed");
			});
	}
});
