/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('starter')
        .controller('PlaceListCtrl', function (
                $scope,
                $stateParams,
                placesService,
                placeDetailsFactory,
                categoryDetailsFactory
                ) {

            $scope.category = categoryDetailsFactory.getTempCategoryDetais();

            $scope.query = '';
            $scope.categoryId = $stateParams.categoryId;

            $scope.getObjects = function (categoryId) {
                placesService.getPlaces(categoryId)
                        .then(function (success) {
                            $scope.places = success.response.groups[0].items;
                        },
                                function (error) {
                                    console.log('Places retrieval failed. Error: ' + JSON.stringify(error));
                                });
            };

            $scope.getObjects($scope.categoryId);

            $scope.setPlaceDetails = function (place) {
                placeDetailsFactory.setTempPlaceDetails(place);
            }
        })