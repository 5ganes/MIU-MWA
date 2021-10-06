angular.module('myApp').controller('SingleTourController', singleTourController);

function singleTourController(TourFactory, $routeParams) {
    const vm = this;
    const tourId = $routeParams.tourId;
    TourFactory.getOne(tourId).then(function (response) {
        vm.tour = response.data;
    });

}