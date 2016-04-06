app

    .controller("AutorCtrl", function($scope, API, $window, $stateParams, $mdDialog) {

    //Valores iniciales
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    //params.page_size = $scope.page_size ? $scope.page_size : 4;
    $scope.lista = [];
    $scope.autor = {};
    

    $scope.list = function(params) {
        console.log("query: " + params.query);
        //API.Autor.list({ query: $scope.query, page: page }).$promise.then(function(r) {
        API.Autor.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
        });
    };

    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        //params.fields = 'nombre,codigo';
        params.query = $scope.query;
        $scope.list(params);

    };


    $scope.listAll = function(page_size) {
        //params.page = 1;
        //params.fields = 'nombre,codigo';
        params.query = $scope.query;
        params.page_size = page_size; //ToDo quitar
        params.all = true; //ToDo, así debe quedar
        $scope.list(params);

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
            templateUrl: 'catalogo/views/autor/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);

        }, function() {});
    };


    //end mdDialog



    $scope.sel = function(d) {
        $scope.autor = API.Autor.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: 'catalogo/views/autor/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);
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
                $scope.list(params);
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };


});
