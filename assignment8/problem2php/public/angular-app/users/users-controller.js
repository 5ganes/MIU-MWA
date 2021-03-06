angular.module("datingApp").controller("UsersController", UsersController);

function UsersController(UserFactory) {
    const vm = this;
    UserFactory.getAllUsers().then(function (response) {
        vm.users = response;
    });
}