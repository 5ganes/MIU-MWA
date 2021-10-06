angular.module("myApp", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main/main.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        })
        .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController',
            controllerAs: 'aboutCtrl'
        })
        .when('/tours', {
            templateUrl: 'tours/tours.html',
            controller: 'ToursController',
            controllerAs: 'toursCtrl'
        })
        .when('/tours/:tourId', {
            templateUrl: 'tour/singleTour.html',
            controller: 'SingleTourController',
            controllerAs: 'singleTourCtrl'
        }).otherwise({
            redirectTo: "/"
        });

}