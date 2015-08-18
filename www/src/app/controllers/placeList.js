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
            $scope.title = '';

            $scope.input = {
                query: ''
            };
            //does not work!!!
            $scope.categoryId = $stateParams.categoryId;

            $scope.query = $stateParams.query;
            if ($scope.query === undefined) {
            }

            $scope.getPlacesOrSearchResults = function (categoryId, query, location) {
                $scope.location = location;
                if (categoryId === undefined) {
                    if (query === undefined) {
                        query = '';
                    }
                    $scope.title = 'Search results';
                    apiFactory.getSearchResults(query, location)
                            .then(function (success) {

                                var placesList;
                                if (success.response.venues !== undefined) {
                                    placesList = [];
                                    for (var i = 0; i < success.response.venues.length; i++) {
                                        var venue = success.response.venues[i];
                                        placesList.push(
                                                {
                                                    'venue': venue
                                                }
                                        );
                                    }
                                }
                                $scope.places = placesList;

                            },
                                    function (error) {
                                        console.log('Searc results retrieval failed. Error: ' + JSON.stringify(error));
                                    });
                } else {
                    $scope.title = $scope.category.name;
                    apiFactory.getPlaces(categoryId, location)
                            .then(function (success) {
                                $scope.places = success.response.groups[0].items;
                            },
                                    function (error) {
                                        console.log('Places retrieval failed. Error: ' + JSON.stringify(error));
                                    });
                }
            };

            var location = locationFactory.getPosition();
            if (location === undefined) {
                locationFactory.getCurrentPosition().then(function (result) {
                    $scope.getPlacesOrSearchResults($scope.categoryId, $scope.query, result);
                }, function (error) {
                    console.log('Location retrieval failed. Error: ' + JSON.stringify(error));
                });
            } else {
                $scope.getPlacesOrSearchResults($scope.categoryId, $scope.query, location);
            }

            $scope.setPlaceDetails = function (place) {
                placeDetailsFactory.setTempPlaceDetails(place);
                placeDetailsFactory.setTempLocation($scope.location);
            }
        })