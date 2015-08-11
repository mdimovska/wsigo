angular.module('starter')
        .factory('placeDetailsFactory', function placeDetailsFactory() {
            var placeDetailsFactory = {};
            var tempPlaceDetails = {};
            var tempLocation = {};
            placeDetailsFactory.setTempPlaceDetails = function (placeDetails) {
                tempPlaceDetails = placeDetails;
            };
            placeDetailsFactory.getTempPlaceDetails = function () {
                return tempPlaceDetails;
            };
            
            placeDetailsFactory.setTempLocation = function (location) {
                tempLocation = location;
            };
            placeDetailsFactory.getTempLocation = function () {
                return tempLocation;
            };
            return placeDetailsFactory;
        })


