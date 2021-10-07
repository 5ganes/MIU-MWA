angular.module("datingApp").controller("UserController", UserController);

function UserController(UserFactory, $routeParams) {
    const vm = this;
    UserFactory.getSingleUser($routeParams.userId).then(function (response) {
        vm.user = response;
    });
}