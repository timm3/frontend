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
