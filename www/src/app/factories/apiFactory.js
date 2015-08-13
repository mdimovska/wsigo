angular.module('starter')

        .factory('apiFactory', function apiFactory($http, $q) {

            var categories = [
                {
                    name: "Food/Drink",
                    id: "4d4b7105d754a06374d81259",
                    cssClass: "main-category"
                },
                {
                    name: "Bakery",
                    id: "4d4b7105d754a06376d81259",
                    cssClass: "sub-category"
                },
                {
                    name: "Café",
                    id: "4bf58dd8d48988d16d941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Creperie",
                    id: "52e81612bcbc57f1066b79f2",
                    cssClass: "sub-category"
                },
                {
                    name: "Dessert Shop",
                    id: "4bf58dd8d48988d1d0941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Fast Food Restaurant",
                    id: "4bf58dd8d48988d16e941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Restaurant",
                    id: "4bf58dd8d48988d1c4941735",
                    cssClass: "sub-category"
                }, {
                    name: "Sandwich Place",
                    id: "4bf58dd8d48988d1c5941735",
                    cssClass: "sub-category"
                }, {
                    name: "Salad Place",
                    id: "4bf58dd8d48988d1bd941735",
                    cssClass: "sub-category"
                }, {
                    name: "Vegetarian / Vegan Restaurant",
                    id: "4bf58dd8d48988d1d3941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Nightlife",
                    id: "4d4b7105d754a06376d81259",
                    cssClass: "main-category"
                },
                {
                    name: "Bar",
                    id: "4bf58dd8d48988d116941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Brewery",
                    id: "50327c8591d4c4b30a586d5d",
                    cssClass: "sub-category"
                },
                {
                    name: "Lounge",
                    id: "4bf58dd8d48988d121941735",
                    cssClass: "sub-category"
                },
                {
                    name: "Nightclub",
                    id: "4bf58dd8d48988d11f941735",
                    cssClass: "sub-category"
                }
            ];

            var apiFactory = {};

            apiFactory.getCategories = function () {
                return categories;
            };
            apiFactory.getPlacesUrl = function (categoryId, location) {
                if (location === undefined) {
                    location = {
                        latitude: 1,
                        longitude: 2
                    }
                }
                if (categoryId === undefined || categoryId === '') {
                    categoryId = '4d4b7105d754a06374d81259';
                }
                var ll = location.latitude + ',' + location.longitude;
                return 'https://api.foursquare.com/v2/venues/explore?client_id=WKTSZRJQFBX5LAIGIPTZ0O3XJLX45SOKRRT3JAWQZBNTMDSY&client_secret=X4MV2K10DTQF0O3AEJAF13GRNFIWPXI3PFKPBGJ2OXRTC5TB&ll=' + ll + '&categoryId=' + categoryId + '&v=20150805&venuePhotos=1';
            }
            apiFactory.getTipsUrl = function (placeId) {
                return 'https://api.foursquare.com/v2/venues/' + placeId + '/tips?sort=recent&client_id=WKTSZRJQFBX5LAIGIPTZ0O3XJLX45SOKRRT3JAWQZBNTMDSY&client_secret=X4MV2K10DTQF0O3AEJAF13GRNFIWPXI3PFKPBGJ2OXRTC5TB&v=20150805';
            }

            apiFactory.getPlaces = function (categoryId, location) {

                var placesUrl = apiFactory.getPlacesUrl(categoryId, location);

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

            apiFactory.getTips = function (placeId) {

                var tipsUrl = apiFactory.getTipsUrl(placeId);

                var def = $q.defer();
                $http.get(tipsUrl)
                        .success(function (data) {
                            def.resolve(data);
                        })
                        .error(function () {
                            def.reject("Failed to get tips");
                        });
                return def.promise;
            }

            function getRandomNumber(toNumber) {
                return Math.floor((Math.random() * toNumber));
            }
            function getRandom(list) {
                return list[Math.floor((Math.random() * list.length))];
            }
            apiFactory.getRandomPlace = function (location) {

                var categories = apiFactory.getCategories();
                //get random category
                var categoryId = getRandom(categories).id;

                var def = $q.defer();
                var placesUrl = apiFactory.getPlacesUrl(categoryId, location);

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
            return apiFactory;
        })