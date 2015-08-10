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