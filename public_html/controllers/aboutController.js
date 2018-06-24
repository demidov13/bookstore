myApp.controller('aboutCtrl', function ($scope, $rootScope, $location, $compile) {

	var map;
$scope.initMap = function() {
    var myLatLng = { lat: 48.451345, lng: 35.050318 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Книжный магазин'
    });
}

});