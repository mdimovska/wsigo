angular.module('starter')
        .controller('RandomPlaceCtrl', function (
                $scope,
                $state,
                placeDetailsFactory,
                apiFactory,
                locationFactory) {

            $scope.imgSrc = 'src/assets/images/default-place.png';

            $scope.getRandomPlace = function () {
                var location = locationFactory.getLocation();
                if (location === undefined) {
                    locationFactory.getCurrentLocation().then(function (result) {
                        loadPlace(result);
                    }, function (error) {
                        alert('There is problem getting your location, please enable location services and try again!');
                        console.log('Location retrieval failed. Error: ' + JSON.stringify(error));
                    });
                } else {
                    loadPlace(location);
                }
            };

            var loadPlace = function (location) {
                $scope.location = location;
                apiFactory.getRandomPlace(location)
                        .then(function (success) {
                            var randomPlace = success;
                            $scope.randomPlace = randomPlace;
                            $scope.placeName = randomPlace.venue.name;
                            if (randomPlace.venue.featuredPhotos !== undefined
                                && randomPlace.venue.featuredPhotos.items !== undefined
                                && randomPlace.venue.featuredPhotos.items.length > 0) {
                                $scope.imgSrc = randomPlace.venue.featuredPhotos.items[0].prefix + 'original' + randomPlace.venue.featuredPhotos.items[0].suffix;
                            } else {
                                console.log('random place without image');
                                $scope.imgSrc = 'src/assets/images/default-place.png';
                            }
                        }, function (error) {
                            console.log('Random place retrieval failed. Error: ' + JSON.stringify(error));
                        });
            }

            $scope.getRandomPlace();

            $scope.showPlaceDetails = function () {
                var randomPlace = $scope.randomPlace;
                placeDetailsFactory.setTempPlaceDetails(randomPlace);
                placeDetailsFactory.setTempLocation($scope.location);
                $state.go('app.place', {placeId: randomPlace.venue.id});
            }

        });
