angular.module('starter')
        .factory('placeDetailsFactory', function placeDetailsFactory() {
            var placeDetailsFactory = {};
            var tempPlaceDetails = {};
            placeDetailsFactory.setTempPlaceDetails = function (placeDetails) {
                tempPlaceDetails = placeDetails;
            };
            placeDetailsFactory.getTempPlaceDetais = function () {
                return tempPlaceDetails;
            };
            return placeDetailsFactory;
        })


