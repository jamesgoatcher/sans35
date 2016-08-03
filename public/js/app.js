var app = angular.module('Sans35App', ['ngRoute']);

	//ROUTES
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode({ enabled:true });

		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).when('/about', {
			templateUrl: 'partials/about.html'
		}).when('/contact', {
			templateUrl: 'partials/contact.html'
		}).when('/engagement', {
			templateUrl: 'partials/engagement.html'
		}).when('/wedding', {
			templateUrl: 'partials/wedding.html'
		}).when('/signup', {
			templateUrl: 'partials/wedding.html'
		});

	}]);

	app.controller('HomeCtrl', function() {
		console.log('home controller works');
	});