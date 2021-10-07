angular.module("meanGame").factory("GameFactory", GameFactory);

function GameFactory($http) {
    return {
        getallGames: getAll,
        getSingleGame: getSingle
    }

    function getAll() {
        return $http.get("api/games")
            .then(complete)
            .catch(failed);
    }

    function getSingle(gameId) {
        return $http.get("api/games/" + gameId)
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