angular.module('starter')
        .controller('RandomPlaceCtrl', function (
                $scope,
                $state,
                placeDetailsFactory,
                apiFactory,
                locationFactory) {

            $scope.imgSrc = 'src/assets/defaultPlaceImg.png';
            $scope.getRandomPlace = function () {

                var location = locationFactory.getPosition();
                if (location === undefined) {
                    locationFactory.getCurrentPosition().then(function (result) {
                        loadPlace(result);
                    }, function (error) {
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
                            if (randomPlace.venue.featuredPhotos !== undefined && randomPlace.venue.featuredPhotos.items !== undefined && randomPlace.venue.featuredPhotos.items.length > 0) {
                                $scope.imgSrc = randomPlace.venue.featuredPhotos.items[0].prefix + 'original' + randomPlace.venue.featuredPhotos.items[0].suffix;
                            } else {
                                console.log('random place without image');
                                $scope.imgSrc = 'src/assets/defaultPlaceImg.png';
                            }

                        },
                                function (error) {
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
