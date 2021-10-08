angular.module('jobSearch').controller('JobController', JobController);

function JobController(JobsFactory, $routeParams) {
    const vm = this;
    JobsFactory.getOneJob($routeParams.jobId).then(function (response) {
        vm.job = response;
    });
};