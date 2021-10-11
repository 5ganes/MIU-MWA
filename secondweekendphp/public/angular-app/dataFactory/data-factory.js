angular.module("datingApp").factory("UserFactory", UserFactory);

function UserFactory($http) {
    return {
        getAllUsers: getAll,
        getSingleUser: getSingle,
        addOneUser: addOne,
        updateOneUser: updateOne,
        deleteUser: deleteUser
    }

    function getAll() {
        return $http.get("/api/users")
            .then(complete)
            .catch(failed);
    }

    function getSingle(userId) {
        return $http.get("/api/users/" + userId)
            .then(complete)
            .catch(failed);
    }

    function addOne(user) {
        return $http.post('/api/users/add', user).then(complete).catch(failed);
    }

    function updateOne(user, userId) {
        return $http.put('/api/users/' + userId, user).then(complete).catch(failed);
    }

    function deleteUser(userId) {
        return $http.delete('/api/users/' + userId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error;
    }
}