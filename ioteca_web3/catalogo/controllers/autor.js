app

    .controller("AutorCtrl", function($scope, API, $window, $mdDialog) {

    $scope.lista = [];
    $scope.autor = {};
    $scope.page = 1;

    $scope.list = function(page) {
        API.Autor.list({ query: $scope.query, page: page }).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
        });
    };

    $scope.list($scope.page);

    $scope.listAll = function(page, page_size) {
        API.Autor.list({ query: $scope.query, page: page, page_size: page_size }).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
        });
    };

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function(evt) {
        $scope.autor.id = null;
        $scope.autor = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: 'build/catalogo/views/autor/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list($scope.page);

        }, function() {});
    };


    //end mdDialog



    $scope.sel = function(d) {
        $scope.autor = API.Autor.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: 'build/catalogo/views/autor/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list($scope.page);
            $scope.autor = {};
        }, function() {});
    };


    $scope.save = function() {
        if ($scope.autor.id) {

            API.Autor.update({ id: $scope.autor.id }, $scope.autor).$promise.then(function(r) {
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            API.Autor.save($scope.autor).$promise.then(function(r) {
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            API.Autor.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                $scope.list($scope.page);
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };


});
