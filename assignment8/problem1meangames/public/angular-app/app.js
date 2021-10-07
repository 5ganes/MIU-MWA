angular.module("meanGame", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/main.html'
        })
        .when('/games', {
            templateUrl: 'angular-app/games/games.html',
            controller: 'GamesController',
            controllerAs: "vm"
        })
        .when('/games/:gameId', {
            templateUrl: 'angular-app/oneGame/game.html',
            controller: 'GameController',
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: '/'
        });
}