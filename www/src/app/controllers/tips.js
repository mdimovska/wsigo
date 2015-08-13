angular.module('starter')
        .controller('TipsCtrl', function (
                $scope,
                $stateParams,
                $ionicHistory,
                apiFactory
                ) {

            $scope.myGoBack = function () {
                $ionicHistory.goBack();
            };
            $scope.placeId = $stateParams.placeId;
            $scope.getTips = function (placeId) {
                apiFactory.getTips(placeId)
                        .then(function (success) {
                            $scope.tips = success.response.tips.items;
                        },
                                function (error) {
                                    console.log('Tips retrieval failed. Error: ' + JSON.stringify(error));
                                });
            };

            $scope.getTips($scope.placeId);
        })