angular.module('jobSearch').controller('JobsController', JobsController);

function JobsController(JobsFactory) {
    const vm = this;
    getAllJobs();

    function getAllJobs() {
        JobsFactory.getAllJobs(0, 15).then(function (response) {
            vm.jobs = response;
        });
    };

    // add and update job in single function
    vm.saveJob = function () {
        const addUpdateJob = {
            title: vm.jobTitle,
            salary: parseFloat(vm.jobSalary),
            location: {
                type: "Point",
                coordinates: [0, 0]
            },
            description: vm.jobDescription,
            experience: vm.jobExperience,
            skills: [],
            postDate: vm.jobPostDate
        };
        // console.log(addUpdateJob, vm.jobId);
        if (vm.addUpdateForm.$valid) {
            if (!vm.jobId) {
                console.log('job id in insert', vm.jobId);
                JobsFactory.addOneJob(addUpdateJob).then(function (response) {
                    console.log("Game Saved", response);
                });
            }
            else {
                // console.log('job id in update', vm.jobId);
                JobsFactory.updateOneJob(addUpdateJob, vm.jobId).then(function (response) {
                    console.log("Game Saved", response);
                });
            }
        }
        else {
            vm.isSubmitted = false;
        }
        getAllJobs();
    };
    vm.editJob = function (jobId) {
        JobsFactory.getOneJob(jobId).then(function (response) {
            vm.jobId = response._id;
            vm.jobTitle = response.title;
            vm.jobSalary = response.salary;
            vm.jobDescription = response.description;
            vm.jobExperience = response.experience;
            vm.jobPostDate = response.postDate;
            // console.log(response);
        });
    };

    vm.deleteJob = function (jobId) {
        JobsFactory.deleteJob(jobId).then(function (response) {
            console.log(response);
        });
        getAllJobs();
    };
}