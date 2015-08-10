angular.module('starter')

        .factory('locationFactory', function locationFactory($q, $window) {

            var locationFactory = {};
            var location = {};

            locationFactory.getCurrentPosition = function () {
                var deferred = $q.defer();
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve(position);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }


            locationFactory.storePosition = function () {
                // Initialise the map
                locationFactory.getCurrentPosition().then(function (result) {
                    location = {
                        center: {
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude
                        },
                        zoom: 8
                    };
                }, function (error) {
                    console.log('Location retrieval failed. Error: ' + JSON.stringify(error));
                });
            }

            locationFactory.getPosition = function () {
                return location;
            }

            return locationFactory;
        });
