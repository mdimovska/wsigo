angular.module('starter')
        .factory('categoryDetailsFactory', function categoryDetailsFactory() {
            var categoryDetailsFactory = {};
            var tempCategoryDetails = {};

            categoryDetailsFactory.setTempCategoryDetails = function (category) {
                tempCategoryDetails = category;
            };

            categoryDetailsFactory.getTempCategoryDetails = function () {
                return tempCategoryDetails;
            };

            return categoryDetailsFactory;
        })