angular.module("datingApp").controller("RegisterController", RegisterController);

function RegisterController(UserFactory, $location) {
    const vm = this;

    vm.saveUser = function () {
        const user = {
            name: vm.name,
            gender: vm.gender,
            age: parseInt(vm.age)
        };
        if (vm.registerForm.$valid) {
            UserFactory.addOneUser(user).then(function (response) {
                console.log("User Added", response);
            });
        }
        else {
            vm.isSubmitted = false;
        }
    };

}