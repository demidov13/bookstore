var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
        when('/all', {
            templateUrl: 'partials/all.html',
            controller: 'allCtrl'
        }).
        when('/detective', {
            templateUrl: 'partials/detective.html',
            controller: 'detectiveCtrl'
        }).
        when('/fantasy', {
            templateUrl: 'partials/fantasy.html',
            controller: 'fantasyCtrl'
        }).
        when('/horror', {
            templateUrl: 'partials/horror.html',
            controller: 'horrorCtrl'
        }).
        when('/thriller', {
            templateUrl: 'partials/thriller.html',
            controller: 'thrillerCtrl'
        }).
        when('/mystic', {
            templateUrl: 'partials/mystic.html',
            controller: 'mysticCtrl'
        }).
        when('/adventure', {
            templateUrl: 'partials/adventure.html',
            controller: 'adventureCtrl'
        }).
        when('/novel', {
            templateUrl: 'partials/novel.html',
            controller: 'novelCtrl'
        }).
        when('/basket', {
            templateUrl: 'partials/basket.html',
            controller: 'basketCtrl'
        }).
        when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'aboutCtrl'
        }).
        otherwise({
            redirectTo: '/all'
        });
        
}]);

