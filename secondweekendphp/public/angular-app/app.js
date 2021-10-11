angular.module("datingApp", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/main.html'
        })
        .when('/users', {
            templateUrl: 'angular-app/users/users.html',
            controller: 'UsersController',
            controllerAs: "vm"
        })
        .when('/users/:userId', {
            templateUrl: 'angular-app/oneUser/user.html',
            controller: 'UserController',
            controllerAs: "vm"
        })
        .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: 'RegisterController',
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: '/'
        });
}