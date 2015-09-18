angular.module('starter')
        .controller('PlaceListCtrl', function (
                $scope,
                $stateParams,
                apiFactory,
                placeDetailsFactory,
                categoryDetailsFactory,
                locationFactory
                ) {

            $scope.category = categoryDetailsFactory.getTempCategoryDetails();
            $scope.title = '';

            //TODO check if really needed...if so, update spec!
            $scope.input = {
                query: ''
            };
            $scope.categoryId = $stateParams.categoryId;

            $scope.query = $stateParams.query;
            if ($scope.query === undefined) {
            }

            $scope.loadPlacesOrSearchResults = function (categoryId, query, location) {
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

            $scope.getPlacesOrSearchResults = function () {
                var location = locationFactory.getLocation();
                if (location === undefined) {
                    locationFactory.getCurrentLocation().then(function (result) {
                        $scope.loadPlacesOrSearchResults($scope.categoryId, $scope.query, result);
                    }, function (error) {
                        console.log('Location retrieval failed. Error: ' + JSON.stringify(error));
                    });
                } else {
                    $scope.loadPlacesOrSearchResults($scope.categoryId, $scope.query, location);
                }
            }

            $scope.getPlacesOrSearchResults();

            $scope.setPlaceDetails = function (place) {
                placeDetailsFactory.setTempPlaceDetails(place);
                placeDetailsFactory.setTempLocation($scope.location);
            }
        })