angular.module('starter')

        .factory('categoryDetailsFactory', function categoryDetailsFactory() {
            var categoryDetailsFactory = {};
            var tempCategoryDetails = {};
            categoryDetailsFactory.setTempCategoryDetails = function (category) {
                tempCategoryDetails = category;
            };
            categoryDetailsFactory.getTempCategoryDetais = function () {
                return tempCategoryDetails;
            };
            return categoryDetailsFactory;
        })
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

        .factory('placesService', function placesService($http, $q, apiFactory) {
            var placesService = {};

            placesService.getPlaces = function (categoryId) {

                var placesUrl = apiFactory.getPlacesUrl(categoryId);

                var def = $q.defer();
                $http.get(placesUrl)
                        .success(function (data) {
                            def.resolve(data);
                        })
                        .error(function () {
                            def.reject("Failed to get place list");
                        });
                return def.promise;
            }
            function getRandomNumber(toNumber) {
                return Math.floor((Math.random() * toNumber));
            }
            function getRandom(list) {
                return list[Math.floor((Math.random() * list.length))];
            }
            placesService.getRandomPlace = function () {

                var categories = apiFactory.getCategories();
                //get random category
                var categoryId = getRandom(categories).id;

                var def = $q.defer();
                var placesUrl = apiFactory.getPlacesUrl();
                placesUrl = placesUrl.replace("", "");


                $http.get(placesUrl)
                        .success(function (data) {
                            var i = getRandomNumber(data.response.groups[0].items.length);
                            var result = data.response.groups[0].items[i];
                            def.resolve(result);
                        })
                        .error(function () {
                            def.reject("Failed to get random place");
                        });
                return def.promise;
            }
            return placesService;
        })

        