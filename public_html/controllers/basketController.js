myApp.controller('basketCtrl', function ($scope, $rootScope, $location, $compile) {

    $scope.order = JSON.parse(sessionStorage.getItem('order'));
    if ($scope.order === null) { $scope.order = []; };
    $scope.client = JSON.parse(sessionStorage.getItem('client'));

    var sum = 0;
    var sumArr = [];

    $.ajax({
        type: "POST",
        url: "http://www.mocky.io/v2/571fa4f010000073116b0f69",
        dataType: "jsonp",
        error: function () {
            alert("При выполнении запроса произошла ошибка :(");
        },
        success: function (data) {
            $('#cont-basket').empty();
            if ($scope.client !== null) {
                var dopCont1 = '<div class="head-basket"><div class="client-div"><div class="name-client"><i class="fa fa-user" aria-hidden="true"></i> ' + $scope.client[0]["name"] + ' <button type="button" class="btn btn-warning" ng-click="newClient()">Сменить пользователя <i class="fa fa-refresh" aria-hidden="true"></i></button></div><div class="cash-client">Баланс счета: ' + $scope.client[0]["cash"] + ' грн.</div></div></div>';
                $('.pay-button').removeAttr('disabled');
            }
            else {
                var dopCont1 = '<div class="head-basket"><form class="form-inline"><div class="form-group"><label for="id-client">Введите номер счета для подтверждения и оплаты заказа: </label><input type="password" class="form-control" id="id-client" placeholder="id"></div><button type="submit" class="btn btn-warning button-id" ng-click="getId()">Готово</button></form></div>';
            };
            var appDopCont1 = $compile(dopCont1)($scope);
            $('#cont-basket').append(appDopCont1);


            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < $scope.order.length; j++) {

                    var test = $scope.order[j]["title"].slice(1, -1);

                    if (data[i].title == test) {

                        var divBook = '<div class="div-book basket-div"></div>';
                        var contDivBook = $compile(divBook)($scope);
                        $('#cont-basket').append(contDivBook);
                        var contAll = '<div class="div-img"><img width="130" height="180" src="' + data[i].url + '" /></div><div class="text-div"><p class="book-title">"' + data[i].title + '"</p><p class="book-author">Автор: ' + data[i].author + '</p><p class="book-genre">Жанр: ' + data[i].genre + '</p><p class="book-year">Год издания: ' + data[i].year + '</p><p class="book-pages">Количество страниц: ' + data[i].pages + '</p><p class="book-age">Возрастное ограничение:' + data[i].age + '</p><p class="book-price">Цена: ' + data[i].price + ' грн.</p><div class="button"><button class="btn btn-info" ng-click="del($event)">Удалить <i class="fa fa-trash" aria-hidden="true"></i></button></div></div>';
                        var content = $compile(contAll)($scope);
                        $('.div-book:last').append(content);
                        sumObj = {};
                        sumObj.title = data[i].title;
                        sumObj.price = data[i].price;
                        sumArr.push(sumObj);
                        delete sumObj;

                    }
                }
            }

            for (k = 0; k < sumArr.length; k++) {
                sum = sum + sumArr[k].price;
            }

            var dopCont2 = '<div class="div-sum">Итого: ' + sum + ' грн.</div><button class="btn btn-success btn-lg pay-button" ng-click="pay()">Подтвердить заказ</button>';
            var appDopCont2 = $compile(dopCont2)($scope);
            $('#cont-basket').append(appDopCont2);
            if ($scope.client === null) { $('.pay-button').attr('disabled', 'disabled'); };
        }
    });

    $scope.del = function ($event) {

        var $textDiv = angular.element($event.target).parent().parent();
        var $bookTitle = $textDiv.find(".book-title").text();

        for (var j = 0; j < $scope.order.length; j++) {

            if ($scope.order[j]["title"] === undefined) {
                return;
            }

            else if ($bookTitle === $scope.order[j]["title"]) {

                $scope.order.splice(j, 1);
            };
        }

        sessionStorage.setItem('order', JSON.stringify($scope.order));

        var $divBook = angular.element($event.target).parent().parent().parent();
        $divBook.remove();

        var priceP = $('.book-price').text();
        priceP = priceP.split('.');
        var newSum = 0;
        for (var p = 0; p < priceP.length; p++) {
            var s = priceP[p];
            s.toString();
            s2 = s.slice(6, -4);
            var newPrice = parseFloat(s2, 10);
            if (!isNaN(newPrice)) { 
                newSum = newSum + newPrice;
            }
        }
        $('.div-sum').empty();
        $('.div-sum').append('Итого: ' + newSum + ' грн.');
  
    }

    $scope.getId = function () {

        var clientID = $('#id-client').val();

        $.ajax({
            type: "POST",
            url: "http://www.mocky.io/v2/57264bc71000006c1c6dd677",
            dataType: "jsonp",
            data: clientID,
            error: function () {
                alert("При выполнении запроса произошла ошибка :(");
            },
            success: function (data) {

                $scope.client = JSON.parse(sessionStorage.getItem('client'));
                if ($scope.client === null) { $scope.client = []; } else { $scope.client.splice(0, 1); };

                for (var c = 0; c < data.length; c++) {
                    if (clientID == data[c].id) { $scope.client.push(data[c]); };
                }

                if ($scope.client.length < 1) {
                    alert("Не правильный номер счета. Повторите попытку.");
                    return;
                };

                $('.pay-button').removeAttr('disabled');
                $('.form-inline').remove();
                var clientDiv = '<div class="client-div"><div class="name-client"><i class="fa fa-user" aria-hidden="true"></i> ' + $scope.client[0]["name"] + ' <button type="button" class="btn btn-warning" ng-click="newClient()">Сменить пользователя <i class="fa fa-refresh" aria-hidden="true"></i></button></div><div class="cash-client">Баланс счета: ' + $scope.client[0]["cash"] + ' грн.</div></div>';
                var appclientDiv = $compile(clientDiv)($scope);
                $('.head-basket').append(appclientDiv);

                sessionStorage.setItem('client', JSON.stringify($scope.client));
            }
        });
    }

    $scope.newClient = function () {
        $('.client-div').remove();
        var login = '<form class="form-inline"><div class="form-group"><label for="id-client">Введите номер счета для подтверждения и оплаты заказа: </label><input type="password" class="form-control" id="id-client" placeholder="id"></div><button type="submit" class="btn btn-warning button-id" ng-click="getId()">Готово</button></form>';
        var addLogin = $compile(login)($scope);
        $('.head-basket').append(addLogin);
        $('.pay-button').attr('disabled', 'disabled');
    }

    $scope.pay = function () {

        $scope.order = JSON.parse(sessionStorage.getItem('order'));
        if ($scope.order === null) { $scope.order = []; };
        $scope.client = JSON.parse(sessionStorage.getItem('client'));

        if ($scope.order.length < 1) {
            alert("Вы не выбрали книг для заказа.");
            return;
        }

        for (var i = 0; i < $scope.order.length; i++) {

            if ($scope.order[i]["title"] === undefined) {
                return;
            }
            else {
                if ($scope.client[0]["age"] < $scope.order[i]["age"]) {
                    alert("К сожалению, ваш возраст не соответствует ограничению одной из книг.");
                    return;
                };
            };
        }
            var findSum = $('.div-sum').text();
            findSum.toString();
            var findSum2 = findSum.slice(7, -4);
            var endSum = parseFloat(findSum2, 10);

            if ($scope.client[0]["cash"] < endSum) {
                alert("К сожалению, у вас недостаточно средств для покупки.");
                return;
            }
            else {
                $scope.client[0]["cash"] -= endSum;
                endSum = 0;
                $('.div-sum').empty();
                $('.div-sum').append('Итого: ' + endSum + ' грн.');
                $('.cash-client').empty();
                $('.cash-client').append('Баланс счета: ' + $scope.client[0]["cash"] + ' грн.');
                $('.div-book').remove();
                sessionStorage.setItem('client', JSON.stringify($scope.client));
                $scope.order = [];
                sessionStorage.setItem('order', JSON.stringify($scope.order));
                alert("Заказ оплачен с вашего счета и отправлен в обработку");
            }                   
    }

});