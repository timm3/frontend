'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('RegNow', ['ngRoute','RegNow.controllers', 'RegNow.directives', 'RegNow.services'], function($routeProvider) {
	    $routeProvider.when('/home', {templateUrl: '/static/partials/HomePage.html'});
	    $routeProvider.when('/ClassPage', {templateUrl: '/static/partials/ClassPage.html', controller:"ClassPageCtrl"});
	    $routeProvider.when('/ClassTablePage', {templateUrl: '/static/partials/ClassTablePage.html', controller:"ClassTableCtrl"});
	    $routeProvider.when('/Profile', {templateUrl: '/static/partials/Profile.html'});
	    $routeProvider.when('/RegNow', {templateUrl: '/static/partials/ClassPage.html', controller:"ClassPageCtrl"});
	    $routeProvider.when('/About', {templateUrl: '/static/partials/about.html'});
	    $routeProvider.when('/About', {templateUrl: '/static/partials/about.html'});
	    $routeProvider.when('/About', {templateUrl: '/static/partials/about.html'});
	    $routeProvider.otherwise({redirectTo: '/home'});
	  });

