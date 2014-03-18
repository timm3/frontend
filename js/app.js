'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('RegNow', ['ngRoute','RegNow.controllers', 'RegNow.directives', 'RegNow.services'], function($routeProvider) {
	    $routeProvider.when('/home', {templateUrl: 'partials/HomePage.html'});
	    $routeProvider.when('/ClassPage', {templateUrl: 'partials/ClassPage.html', controller:"ClassPageCtrl"});
	    $routeProvider.when('/ClassTablePage', {templateUrl: 'partials/ClassTablePage.html', controller:"ClassTableCtrl"});
	    $routeProvider.when('/RegNow', {templateUrl: 'partials/ClassPage.html', controller:"ClassPageCtrl"});
	    $routeProvider.otherwise({redirectTo: '/home'});
	  });

