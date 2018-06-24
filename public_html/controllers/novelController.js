myApp.controller('novelCtrl', function ($scope, $rootScope, $location, $compile) {

    $scope.order = JSON.parse(sessionStorage.getItem('order'));
    if ($scope.order === null) { $scope.order = []; };

    var genre = "роман";

    $.ajax({
        type: "POST",
        url: "http://www.mocky.io/v2/571fa4f010000073116b0f69",
        dataType: "jsonp",
        data: genre,
        error: function () {
            alert("При выполнении запроса произошла ошибка :(");
        },
        success: function (data) {
            $('#cont-novel').empty();
            var arr = [];
            for (var i = 0; i < data.length; i++) {

                var testGenre = data[i].genre;
                var testArr = testGenre.split(', ');
                for (j = 0; j < testArr.length; j++) {

                    if (testArr[j] == genre) {

                        var divBook = '<div class="div-book"></div>';
                        var contDivBook = $compile(divBook)($scope);
                        $('#cont-novel').append(contDivBook);
                        var contAll = '<div class="div-img"><img width="130" height="180" src="' + data[i].url + '" /></div><div class="text-div"><p class="book-title">"' + data[i].title + '"</p><p class="book-author">Автор: ' + data[i].author + '</p><p class="book-genre">Жанр: ' + data[i].genre + '</p><p class="book-year">Год издания: ' + data[i].year + '</p><p class="book-pages">Количество страниц: ' + data[i].pages + '</p><p class="book-age">Возрастное ограничение:' + data[i].age + '</p><p class="book-price">Цена: ' + data[i].price + ' грн.</p><div class="button"><button class="btn btn-success" ng-click="addNovel($event)">Купить <i class="fa fa-shopping-cart" aria-hidden="true"></i></button></div></div>';
                        var content = $compile(contAll)($scope);
                        $('.div-book:last').append(content);

                        delete testArr[j];
                    }
                }
            }
        }
    });

    $scope.addNovel = function ($event) {

        var $textDiv = angular.element($event.target).parent().parent();
        var $bookTitle = $textDiv.find(".book-title").text();
        var $bookAge = $textDiv.find(".book-age").text();
        $bookAge.toString();
        var $bookAge2 = $bookAge.slice(23);
        var endBookAge = parseFloat($bookAge2, 10);

        var obj = {};
        obj.title = $bookTitle;
        obj.age = endBookAge;
        $scope.order.push(obj);
        delete obj;

        sessionStorage.setItem('order', JSON.stringify($scope.order));

    }

});