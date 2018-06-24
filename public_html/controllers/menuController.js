myApp.controller('menuCtrl', function ($scope, $location, $compile) {

    $scope.isActive = function (path) {
        return path === $location.path();
    };

});