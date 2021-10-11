angular.module("datingApp").controller("UsersController", UsersController);

function UsersController(UserFactory) {
    const vm = this;

    getAllUsers();

    function getAllUsers() {
        UserFactory.getAllUsers().then(function (response) {
            if (!Array.isArray(response)) {
                vm.message = response.data.message;
                vm.users = null;
            }
            else {
                vm.users = response;
                vm.message = null
            }
        });
    };

    // add and update user in single function
    vm.saveUser = function () {
        const addUpdateUser = {
            name: vm.name,
            gender: vm.gender,
            age: parseInt(vm.age)
        };
        if (vm.addUpdateForm.$valid) {
            if (!vm.userId) {
                UserFactory.addOneUser(addUpdateUser).then(function (response) {
                    console.log("User Added", response);
                });
            }
            else {
                UserFactory.updateOneUser(addUpdateUser, vm.userId).then(function (response) {
                    console.log("User Updated", response);
                });
            }
            getAllUsers();
        }
        else {
            vm.isSubmitted = false;
        }
    };

    vm.editUser = function (userId) {
        UserFactory.getSingleUser(userId).then(function (response) {
            vm.userId = response._id;
            vm.name = response.name;
            vm.gender = response.gender;
            vm.age = parseInt(response.age);
        });
    };

    vm.deleteUser = function (userId) {
        UserFactory.deleteUser(userId).then(function (response) {
            console.log(response);
        });
        getAllUsers();
    };

}