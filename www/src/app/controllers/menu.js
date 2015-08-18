angular.module('starter')

        .controller('MenuCtrl',
                function (
                        $scope,
                        apiFactory,
                        $state,
                        categoryDetailsFactory,
                        $ionicSideMenuDelegate
                        ) {

                    // With the new view caching in Ionic, Controllers are only called
                    // when they are recreated or on app start, instead of every page change.
                    // To listen for when this page is active (for example, to refresh data),
                    // listen for the $ionicView.enter event:
                    //$scope.$on('$ionicView.enter', function(e) {
                    //});

                    $scope.searchQuery = '';

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
