// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
    [
        'ionic',
        'uiGmapgoogle-maps',
        'RequestInterceptor'
    ])

    .run(function ($ionicPlatform, locationFactory) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

    })

    .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'src/app/views/menu.html',
                controller: 'MenuCtrl'
            })

            .state('app.randomPlace', {
                url: '/randomPlace',
                views: {
                    'menuContent': {
                        templateUrl: 'src/app/views/randomPlace.html',
                        controller: 'RandomPlaceCtrl'
                    }
                }
            })
            .state('app.placeList', {
                url: '/places?categoryId=:&query=:',
                views: {
                    'menuContent': {
                        templateUrl: 'src/app/views/placeList.html',
                        controller: 'PlaceListCtrl'
                    }
                }
            })

            .state('app.tips', {
                url: '/places/:placeId/tips',
                views: {
                    'menuContent': {
                        templateUrl: 'src/app/views/tips.html',
                        controller: 'TipsCtrl'
                    }
                }
            })
            .state('app.place', {
                url: '/places/:placeId',
                views: {
                    'menuContent': {
                        templateUrl: 'src/app/views/place.html',
                        controller: 'PlaceCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('app/randomPlace');

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyD1Gu7s2Eh1LcXGDd4-88DqAbijwYH-iBk',
            v: '3.17',
            language: 'en',
            sensor: 'false',
        })
    });

angular.module('RequestInterceptor', [])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('requestInterceptor');
    }).factory('requestInterceptor', [
        function () {
            return {
                'request': function (config) {
                    if(config.url.indexOf('http')>-1){
                        config.cache = false;
                    }
                    return config;
                }

            };
        }]);
