angular.module('myApp').controller('ToursController', toursController);

function toursController(TourFactory) {
    const vm = this;
    TourFactory.getAll().then(function (response) {
        vm.tours = response.data;
    });
}