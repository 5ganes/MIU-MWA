angular.module('jobSearch').factory('JobsFactory', JobsFactory);

function JobsFactory($http) {
    return {
        getAllJobs: getAll,
        getOneJob: getOne,
        addOneJob: addOne,
        updateOneJob: updateOne,
        deleteJob: deleteJob
    };

    function getAll(offset = 0, count = 5) {
        return $http.get('/api/jobs?offset=' + offset + '&count=' + count).then(complete).catch(failed);
    }

    function getOne(jobId) {
        return $http.get('/api/jobs/' + jobId).then(complete).catch(failed);
    }

    function addOne(job) {
        return $http.post('/api/jobs', job).then(complete).catch(failed);
    }

    function updateOne(job, jobId) {
        return $http.put('/api/jobs/' + jobId, job).then(complete).catch(failed);
    }

    function deleteJob(jobId) {
        return $http.delete('/api/jobs/' + jobId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error;
    }
}