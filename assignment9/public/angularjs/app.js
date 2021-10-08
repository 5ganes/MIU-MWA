angular.module("jobSearch", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angularjs/main/main.html'
        })
        .when('/jobs', {
            templateUrl: 'angularjs/jobs/jobs.html',
            controller: 'JobsController',
            controllerAs: 'vm'
        })
        .when('/jobs/:jobId', {
            templateUrl: 'angularjs/job/job.html',
            controller: 'JobController',
            controllerAs: 'vm'
        })
        .when('/jobs/:jobId/edit', {
            templateUrl: 'angularjs/edit-job/edit-form.html',
            controller: 'JobEditController',
            controllerAs: 'vm'
        });
};