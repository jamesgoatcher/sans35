var app = angular.module('Sans35App', ['ngRoute', 'ngAnimate']);

	//ROUTES
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$locationProvider.html5Mode({ enabled:true });

		$routeProvider.when('/', {
			templateUrl: 'partials/static/home.html',
			controller: 'HomeCtrl',
		}).when('/about', {
			templateUrl: 'partials/static/about.html'
		}).when('/testimonial', {
			templateUrl: 'partials/static/testimonial.html'
		}).when('/contact', {
			templateUrl: 'partials/static/contact.html'
		}).when('/engagement', {
			templateUrl: 'partials/engagement/engagement.html'
		}).when('/wedding', {
			templateUrl: 'partials/wedding/wedding.html'
		}).when('/signin', {
			templateUrl: 'partials/user/signin.html',
			controller: 'SignIn',
				controllerAs: 'signin'
		}).when('/signup', {
			templateUrl: 'partials/user/signup.html',
			controller: 'SignUp',
				controllerAs: 'signup'
		}).when('/users/:id', {
			templateUrl: 'partials/user/users.html',
			controller: 'UserCtrl',
				controllerAs: 'user'
		}).when('/users/:id/album', {
			templateUrl: 'partials/user/album.html'
		}).when('/password', {
			templateUrl: 'partials/user/password.html'
		}).when('/wedding/:id', {
			templateUrl: 'partials/wedding/show.html',
			controller: 'WeddingShowCtrl',
				controllerAs: 'weddingshow'
		}).when('/engagement/:id', {
			templateUrl: 'partials/engagement/show.html',
			controller: 'EngagementShowCtrl',
				controllerAs: 'engagementshow'
		}).when('/logout', {
			templateUrl: 'partials/user/logout.html',
			controller: 'LogOut',
				controllerAs: 'logout'
		});

	}]);

//INDEX - Controller (PARENT)
	app.controller('Index', ['$http', '$scope', '$location', '$anchorScroll', function($http, $scope, $anchorScroll) {
		console.log('index controller works');

		var index      = this;

		//Nav bar signin/logout control.  True = No User | False = User
		$scope.noUser  = true;

		//User page album div.  True = Album | False = No Album
		$scope.noAlbum = false;

		//Admin is set to false by default and can't be added through GUI.
		//True = Active | False = Inactive
		$scope.admin   = false;

		//Transmits logged in user info to parent
		$scope.$on('getUser', function(event, data){ 
			index.user = data.userLogged;
			$scope.user = index.user;
		
			if ($scope.user.email !== undefined) { //nav bar links, w/o final suffix = bad PW return user profile
				index.navEmail = index.user.email;
				index.navLink = '/users/{{index.user._id}}';
				$scope.noUser = false;
			};

			//Album?
			if ($scope.user.album.length >= 1) {
				$scope.noAlbum = true;
			};

			//Admin Control.
			if ($scope.user.admin === true) {
				$scope.admin = true;
			};
		});

	}]);

//HOME - Controller
	app.controller('HomeCtrl', ['$http', '$scope', function($http, $scope) {
		console.log('home controller works');
	}]);

//WEDDING, SHOW - Controller
app.controller('WeddingShowCtrl', ['$http', '$scope', '$routeParams', '$anchorScroll', function($http, $scope, $routeParams, $anchorScroll) {

	console.log('wedding show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);

//ENGAGEMENT, SHOW - Controller
app.controller('EngagementShowCtrl', ['$http', '$scope', '$routeParams', '$anchorScroll', function($http, $scope, $routeParams, $anchorScroll) {

	console.log('engagement show page');
	var show = this;


	var params = $routeParams.id

	$scope.couple = params;

}]);

//USER - Controller
app.controller('UserCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	console.log('user page');

	// if ($routeParams.id === '57aaa2ce9f2e44381709b526') {
		$http ({
			method: 'GET',
			url:    '/users/:id'
		}).success(function(data) {
			$scope.clientList = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	// };

	$scope.url = 'temp';

	$scope.editClient = function(client, url) {
		var clientInfo = {};
		clientInfo.id = client;
		clientInfo.url = url;
		$scope.addedArray = clientInfo.url.length;
		$http.post('/users/update/' + client._id, clientInfo)
		.success(function(data) {
			$scope.clientList = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		$scope.client.url = '';
	};

}]);

//SIGN UP - Controller
app.controller('SignUp', ['$http', '$scope', '$location', '$window', '$anchorScroll', function($http, $scope, $location, $window, $anchorScroll) {

	console.log('sign up page');
	$scope.badEmail = false;

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
				$scope.badEmail = true;
			}
		});
	}

}]);

//SIGN IN - Controller
app.controller('SignIn', ['$http', '$scope', '$location', '$route', '$anchorScroll', function($http, $scope, $location, $route, $anchorScroll) {

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
app.controller('LogOut', ['$http', '$scope', '$location', '$route', '$anchorScroll', function($http, $scope, $location, $route, $anchorScroll) {

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


