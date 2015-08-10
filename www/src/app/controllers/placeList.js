angular.module('starter')
        .controller('PlaceListCtrl', function (
                $scope,
                $stateParams,
                apiFactory,
                placeDetailsFactory,
                categoryDetailsFactory,
                locationFactory
                ) {

            $scope.category = categoryDetailsFactory.getTempCategoryDetais();

            $scope.query = '';
            $scope.categoryId = $stateParams.categoryId;

            $scope.getPlaces = function (categoryId, location) {
                apiFactory.getPlaces(categoryId, location)
                        .then(function (success) {
                            $scope.places = success.response.groups[0].items;
                        },
                                function (error) {
                                    console.log('Places retrieval failed. Error: ' + JSON.stringify(error));
                                });
            };

            var location = locationFactory.getPosition();
            if (location === undefined) {
                locationFactory.getCurrentPosition().then(function (result) {
                    $scope.getPlaces($scope.categoryId, result);
                }, function (error) {
                    console.log('Location retrieval failed. Error: ' + JSON.stringify(error));
                });
            } else {
                $scope.getPlaces($scope.categoryId, location);
            }

            $scope.setPlaceDetails = function (place) {
                placeDetailsFactory.setTempPlaceDetails(place);
            }
        })