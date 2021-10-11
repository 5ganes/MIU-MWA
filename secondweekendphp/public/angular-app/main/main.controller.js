angular.module('datingApp').controller('MainController', MainController);

function MainController(UserFactory) {
    const vm = this;

    vm.searchUser = function () {
        console.log('search');
        const keyword = {
            keyword: vm.keyword
        };
        UserFactory.searchUser(keyword).then(function (response) {
            vm.users = response;
            console.log(response);
        });
    };
}