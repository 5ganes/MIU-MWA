angular.module("datingApp").factory("UserFactory", UserFactory);

function UserFactory($http) {
    return {
        getAllUsers: getAll,
        getSingleUser: getSingle
    }

    function getAll() {
        return $http.get("api/users")
            .then(complete)
            .catch(failed);
    }

    function getSingle(userId) {
        return $http.get("api/users/" + userId)
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