var app = angular.module('Sans35App', ['ngRoute']);

	//ROUTES
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode({ enabled:true });

		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl',
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
			templateUrl: 'partials/signin.html',
			controller: 'SignIn',
				controllerAs: 'signin'
		}).when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'SignUp',
				controllerAs: 'signup'
		}).when('/users/:id', {
			templateUrl: 'partials/users.html'
		}).when('/password', {
			templateUrl: 'partials/password.html'
		}).when('/wedding/:id', {
			templateUrl: 'partials/wedding/show.html',
			controller: 'WeddingShowCtrl',
				controllerAs: 'weddingshow'
		}).when('/engagement/:id', {
			templateUrl: 'partials/engagement/show.html',
			controller: 'EngagementShowCtrl',
				controllerAs: 'engagementshow'
		}).when('/logout', {
			templateUrl: 'partials/logout.html',
			controller: 'LogOut',
				controllerAs: 'logout'
		});

	}]);

//INDEX - Controller
	app.controller('Index', ['$http', '$scope', function($http, $scope) {
		console.log('index controller works');
	}]);

//HOME - Controller
	app.controller('HomeCtrl', ['$http', '$scope', function($http, $scope) {
		console.log('home controller works');
	}]);

//WEDDING, SHOW - Controller
app.controller('WeddingShowCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	console.log('wedding show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);

//ENGAGEMENT, SHOW - Controller
app.controller('EngagementShowCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	console.log('engagement show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);

//SIGN UP - Controller
app.controller('SignUp', ['$http', '$scope', '$location', '$window', function($http, $scope, $location, $window) {

	console.log('sign up page');
	$scope.badPassword = false;

	this.signUp = function() {
		$http ({
			method: 'POST',
			url:    '/users',
			data:   this.form
		}).then(function(result){
			if(result.data !== ''){
				userLogged = result.data;
				$scope.$emit('getUser', {
					userLogged: userLogged
			});
				console.log('Sign Up successful')
				$location.url('/users/'+userLogged._id);
			} else {
				console.log('Email already taken')
				$scope.badPassword = true;
			}
		});
	}

}]);

//SIGN IN - Controller
app.controller('SignIn', ['$http', '$scope', '$location', '$route', function($http, $scope, $location, $route) {

	console.log('sign in page');

	$scope.badPassword = false;

	this.signIn = function() {
		$http ({
			method: 'POST',
			url:    '/users/login',
			data:   this.form
		}).then(function(result){
			if (result.data !== 'password incorrect'){
				userLogged = result.data;
				$scope.$emit('getUser', {
					userLogged: userLogged
				});
				console.log('sign in successful');
				$location.url('/users/'+userLogged._id);
			} else {
				console.log('incorrect password')
				$scope.badPassword = true;
			}
		});
	}

}]);

//LOG OUT - Controller
app.controller('LogOut', ['$http', '$scope', '$location', '$route', function($http, $scope, $location, $route) {

	this.logOut = function() {
		$http ({
			method: 'POST',
			url:    '/users/logout',
			data:   this.form
		}).then(function(result){
			userLogged = null;
			$scope.$emit('getUser', {
				userLogged: userLogged
			});
			$scope.$parent.noUser = true;
			console.log('logged out');
			location.reload();
		});
	}

}]);


