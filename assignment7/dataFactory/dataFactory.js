angular.module("myApp").factory("TourFactory", tourFactory);
function tourFactory($http) {
    return {
        getAll: getAll,
        getOne: getOne
    };
    function getAll() {
        return $http.get("https://api.artic.edu/api/v1/tours")
            .then(complete)
            .catch(failed);
    }
    function getOne(tourId) {
        return $http.get("https://api.artic.edu/api/v1/tours/" + tourId)
            .then(complete)
            .catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error;
    }
}