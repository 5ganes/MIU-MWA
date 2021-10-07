angular.module("meanGame").controller("GamesController", GamesController);

function GamesController(GameFactory) {
    const vm = this;
    GameFactory.getallGames().then(function (response) {
        vm.games = response;
    });
}