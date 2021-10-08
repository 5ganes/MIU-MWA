angular.module('jobSearch').controller('JobEditController', JobEditController);

function JobEditController(JobsFactory, $routeParams) {
    const vm = this;
    const jobId = $routeParams.jobId;
    JobsFactory.getOneJob(jobId).then(function (response) {
        vm.job = response;
        console.log(vm.job);
    });
}