angular.module('starter')
    .factory('locationFactory', function locationFactory($q, $window) {
        var locationFactory = {};
        var location;

        locationFactory.getCurrentLocation = function () {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (position) {
                location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 8
                };
                deferred.resolve(location);
            }, function (error) {
                deferred.reject(error);
            }, {timeout: 10000, enableHighAccuracy: true, maximumAge: 600000});
            return deferred.promise;
        }

        locationFactory.getLocation = function () {
            return location;
        }

        return locationFactory;
    });
