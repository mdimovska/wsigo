angular.module('starter')
        .controller('PlaceCtrl', function (
                $scope,
                $stateParams,
                placeDetailsFactory) {
            $scope.place = placeDetailsFactory.getTempPlaceDetais();
            $scope.placeId = $stateParams.placeId;
        });