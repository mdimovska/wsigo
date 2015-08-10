// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
        [
            'ionic'
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

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        //abstract: true,
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
                        url: '/categories/:categoryId/places',
                        views: {
                            'menuContent': {
                                templateUrl: 'src/app/views/placeList.html',
                                controller: 'PlaceListCtrl'
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
        });
