angular.module('starter')

        .controller('MenuCtrl',
                function (
                        $scope,
                        apiFactory,
                        $state,
                        categoryDetailsFactory,
                        $ionicSideMenuDelegate
                        ) {

                    $scope.categories = apiFactory.getCategories();

                    $scope.setCategoryDetails = function (category) {
                        categoryDetailsFactory.setTempCategoryDetails(category);
                    }

                    $scope.search = function (event, query) {
                        if (event.keyCode == 13) {
                            $state.go('app.placeList', {query: query, categoryId: undefined});
                            $ionicSideMenuDelegate.toggleLeft();
                        }
                    }

                })
