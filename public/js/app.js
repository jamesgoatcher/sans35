var app = angular.module('Sans35App', ['ngRoute']);

	//ROUTES
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode({ enabled:true });

		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).when('/about', {
			templateUrl: 'partials/about.html'
		}).when('/testimonial', {
			templateUrl: 'partials/testimonial.html'
		}).when('/contact', {
			templateUrl: 'partials/contact.html'
		}).when('/engagement', {
			templateUrl: 'partials/engagement.html'
		}).when('/wedding', {
			templateUrl: 'partials/wedding.html'
		}).when('/signin', {
			templateUrl: 'partials/signin.html'
		}).when('/wedding/:id', {
			templateUrl: 'partials/wedding/show.html',
			controller: 'WeddingShowCtrl',
				controllerAs: 'weddingshow'
		}).when('/engagement/:id', {
			templateUrl: 'partials/engagement/show.html',
			controller: 'EngagementShowCtrl',
				controllerAs: 'engagementshow'
		});

	}]);

	app.controller('HomeCtrl', function() {
		console.log('home controller works');
	});


app.controller('WeddingShowCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	console.log('wedding show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);

app.controller('EngagementShowCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	console.log('engagement show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);








