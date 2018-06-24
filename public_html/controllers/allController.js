myApp.controller('allCtrl', function ($scope, $rootScope, $location, $compile) {

    $scope.order = JSON.parse(sessionStorage.getItem('order'));
    if ($scope.order === null) { $scope.order = []; };

        $.ajax({
            type: "POST",
            url: "http://www.mocky.io/v2/571fa4f010000073116b0f69",
            dataType: "jsonp",
            error: function () {
                alert("При выполнении запроса произошла ошибка :(");
            },
            success: function (data) {
                $('#cont-all').empty();

                var divSearch = '<div class="head-search"><form class="form-inline"><div class="form-group"><label for="id-search">Введите данные для поиска </label><input type="text" class="form-control" id="id-search" placeholder="search"></div><button type="submit" class="btn btn-warning button-search" ng-click="search()">Найти</button></form></div>';
                var appDivSearch = $compile(divSearch)($scope);
                $('#cont-all').append(appDivSearch);

                for (var i = 0; i < data.length; i++) {

                    var divBook = '<div class="div-book"></div>';
                    var contDivBook = $compile(divBook)($scope);
                    $('#cont-all').append(contDivBook);
                        var contAll = '<div class="div-img"><img width="130" height="180" src="' + data[i].url + '" /></div><div class="text-div"><p class="book-title">"' + data[i].title + '"</p><p class="book-author">Автор: ' + data[i].author + '</p><p class="book-genre">Жанр: ' + data[i].genre + '</p><p class="book-year">Год издания: ' + data[i].year + '</p><p class="book-pages">Количество страниц: ' + data[i].pages + '</p><p class="book-age">Возрастное ограничение:' + data[i].age + '</p><p class="book-price">Цена: ' + data[i].price + ' грн.</p><div class="button"><button class="btn btn-success" ng-click="addAll($event)">Купить <i class="fa fa-shopping-cart" aria-hidden="true"></i></button></div></div>';
                        var content = $compile(contAll)($scope);
                        $('.div-book:last').append(content);
                }                            
            }
        });

        $scope.addAll = function ($event) {

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

        $scope.search = function () {

            var searchValue = $('#id-search').val();
            var testElem = searchValue.toString().toLowerCase();

            $('#cont-all').empty();

            var divSearch = '<div class="head-search"><form class="form-inline"><div class="form-group"><label for="id-search">Введите название книги </label><input type="text" class="form-control" id="id-search" placeholder="search"></div><button type="submit" class="btn btn-warning button-id" ng-click="search()">Поиск</button></form></div>';
            var appDivSearch = $compile(divSearch)($scope);
            $('#cont-all').append(appDivSearch);

            $.ajax({
                type: "POST",
                url: "http://www.mocky.io/v2/571fa4f010000073116b0f69",
                dataType: "jsonp",
                data: searchValue,
                error: function () {
                    alert("При выполнении запроса произошла ошибка :(");
                },
                success: function (data) {

                    for (var i = 0; i < data.length; i++) {

                        var testObj = data[i];
                        var testRes = 0;

                        for (var key in testObj) {
                            var keyString = testObj[key];
                            var testKey = keyString.toString().toLowerCase();
                            if (testElem == testKey) {
                                testRes += 1;
                            };
                        }

                        if (testRes > 0) {

                            var divBook = '<div class="div-book"></div>';
                            var contDivBook = $compile(divBook)($scope);
                            $('#cont-all').append(contDivBook);
                            var contAll = '<div class="div-img"><img width="130" height="180" src="' + data[i].url + '" /></div><div class="text-div"><p class="book-title">"' + data[i].title + '"</p><p class="book-author">Автор: ' + data[i].author + '</p><p class="book-genre">Жанр: ' + data[i].genre + '</p><p class="book-year">Год издания: ' + data[i].year + '</p><p class="book-pages">Количество страниц: ' + data[i].pages + '</p><p class="book-age">Возрастное ограничение:' + data[i].age + '</p><p class="book-price">Цена: ' + data[i].price + ' грн.</p><div class="button"><button class="btn btn-success" ng-click="addAll($event)">Купить <i class="fa fa-shopping-cart" aria-hidden="true"></i></button></div></div>';
                            var content = $compile(contAll)($scope);
                            $('.div-book:last').append(content);

                            testRes = 0;
                        };
                    }
                }
            });
        }

    });

