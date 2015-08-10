angular.module('starter')
        .controller('RandomPlaceCtrl', function (
                $scope,
                $state,
                placeDetailsFactory,
                placesService) {

            $scope.imgSrc = 'src/assets/defaultPlaceImg.png';
            $scope.getRandomPlace = function () {
                placesService.getRandomPlace()
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
            };

            $scope.getRandomPlace();

            $scope.showPlaceDetails = function () {
                var randomPlace = $scope.randomPlace;
                placeDetailsFactory.setTempPlaceDetails(randomPlace);
                $state.go('app.place', {placeId: randomPlace.venue.id});
            }

        });
