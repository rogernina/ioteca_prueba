/**
 * Util functions for AngularJS
 * @version v0.0.1 (15.02.2016)
 * asullom (c) 2016 Devhres Team
 * License: MIT
 */

var ngDevhres = angular.module("ngDevhres", []);

/**
 * Declaración de variables
 */
ngDevhres.value("safeValue", "Hi ngDevhres team");



/**
 * Servicio security
 */
ngDevhres
    .service("security", function(safeValue) {
        /**
         * Ejemplo simple
         *
         * @returns {string}
         */
        this.doIt = function() {
            return "Security.doIt() called: " + safeValue;
        };

        /**
         * Verifica si un arrays está contenido en otro (usado para verificar roles)
         *
         * @param userRoles {array}
         * @param rolesToCheck {Array}
         * @returns {boolean}
         */
        this.checkRole = function(userRoles, rolesToCheck) {
            if (rolesToCheck.length === 0) {
                return true;
            }
            if (userRoles.length === 0) {
                return false;
            }
            for (var i = 0; i < userRoles.length; i++) {
                if (rolesToCheck.indexOf(userRoles[i]) > -1) {
                    return true;
                }
            }
            return false;
        };

    });


/**
 *  Menu
 */
ngDevhres
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.find('a').bind('click', function(e) {
                    var li = angular.element(this).parent();
                    var active = li.parent()[0].querySelectorAll('.active');
                    li.toggleClass('active');
                    angular.element(active).removeClass('active');
                    //angular.element(active).removeClass('toggled');
                });
            }
        };
    }])

// =========================================================================
// SUBMENU TOGGLE
// =========================================================================
.directive('toggleSubmenu', function($timeout) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            /*element.click(function(){
                element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            })*/

            element.bind("click", function(e) {

                element.parent().toggleClass('toggled');
                //element.parent().find('ul').stop(true, false).slideToggle(200);
                //var ul = element.find('ul');

                var li = angular.element(this).parent();
                //var active = li.parent()[0].querySelectorAll('.active');
                li.toggleClass('active');
                //angular.element(active).removeClass('active');
                // angular.element(this).children().toggleClass("md-toggle-icon toggled");
            });
            /*
            element.find('a').bind('click', function(e) {
                console.log("click");
              element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            });
            */
        }
    };
});


ngDevhres

    .filter('nospace', function() {
    return function(value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
})

.filter('humanizeDoc', function() {
    return function(doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function($1) {
                return '-' + $1.toLowerCase();
            });
        }
        return doc.label || doc.name;
    };
})

.filter('directiveBrackets', function() {
    return function(str) {
        if (str.indexOf('-') > -1) {
            return '<' + str + '>';
        }
        return str;
    };
});



ngDevhres

    .directive('miPagination', function() {
    return {
        restrict: 'EA',
        link: myLink,
        scope: {
            query: '=',
            page: '=',
            pages: '=',
            next: '=',
            previous: '=',
            rango: '=',
            accion: '&',
            activado: '@'
        },
        //templateUrl: 'app/views/directives/pagination/mi_pagination.html',
        template: '<ul>' +
            '<li ng-repeat="ecq in Pagination" ng-class="ecq.myclase" ng-click="ecq.action()">' +
            '<span ng-bind="ecq.value"></span>' +
            '</li>' +
            '</ul>' +
            '',
    };

    function myLink(scope, el, attrs) {
        scope.$watchCollection('[page,pages,next,previous,rango,activado, query]', function() {
            Algoritmo(scope, attrs);
        });
    }

    function parametrosDefault(scope, attrs) {
        scope.Pagination = [];
        scope.puntos = scope.puntos || '...';
        scope.page = parseInt(scope.page);
        scope.pages = parseInt(scope.pages);
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.activado = scope.activado || 'active';
    }

    function anteriorSiguente(scope, opcion) {
        var deshabilitar, var1, var2;
        if (opcion === 'anterior') {
            deshabilitar = scope.page - 1 <= 0;
            var1 = { value: "<<", page: 1 };
            var2 = { value: "<", page: scope.previous };
        } else {
            deshabilitar = scope.page + 1 > scope.pages;
            var1 = { value: ">", page: scope.next };
            var2 = { value: ">>", page: scope.pages };
        }

        var mybutton = function(myparam, deshabilitar) {
            scope.Pagination.push({
                value: myparam.value,
                action: function() {
                    if (!deshabilitar) {
                        myAccion(scope, myparam.page);
                    }
                }
            });
        };

        mybutton(var1, deshabilitar);
        mybutton(var2, deshabilitar);
    }


    function myAccion(scope, page) {
        if (scope.page == page) {
            return;
        }
        scope.page = page;

        var param = {};
        param.page = scope.page;
        //param.pages = scope.pages;
        param.query = scope.query;

        //scope.accion({ page: scope.page, pages: scope.pages });
        scope.accion({ params: param });
    }

    function rango(inicio, fin, scope) {
        var i = 0;
        for (i = inicio; i <= fin; i++) {
            var item = {
                value: i,
                myclase: (scope.page == i) ? scope.activado : '',
                action: function() {
                    myAccion(scope, this.value);
                }
            };
            scope.Pagination.push(item);
        }
    }

    function agregarPuntos(scope) {
        scope.Pagination.push({ value: scope.puntos });
    }

    function agregarRango(scope) {
        scope.Pagination.push({ value: scope.rango });
    }

    function agregarPrimero(next, scope) {
        rango(1, 2, scope);
        if (next != 3) {
            agregarPuntos(scope);
        }
    }

    function agregarUltimo(prev, scope) {
        if (prev != scope.pages - 2) {
            agregarPuntos(scope);
        }
        rango(scope.pages - 1, scope.pages, scope);
    }


    function Algoritmo(scope, attrs) {
        parametrosDefault(scope, attrs);
        var adj = (scope.adjacent * 2) + 2;
        var inicio, fin;

        agregarRango(scope);
        anteriorSiguente(scope, 'anterior');
        if (scope.pages <= (adj + 2)) {
            inicio = 1;
            rango(inicio, scope.pages, scope);
        } else {

            if (scope.page - scope.adjacent <= 2) {
                inicio = 1;
                fin = 1 + adj;
                rango(inicio, fin, scope);
                agregarUltimo(fin, scope);

            } else if (scope.page < scope.pages - (scope.adjacent + 2)) {

                inicio = scope.page - scope.adjacent;
                fin = scope.page + scope.adjacent;

                agregarPrimero(inicio, scope);
                rango(inicio, fin, scope);
                agregarUltimo(fin, scope);

            } else {
                inicio = scope.pages - adj;
                fin = scope.pages;
                agregarPrimero(inicio, scope);
                rango(inicio, fin, scope);
            }
        }
        anteriorSiguente(scope, 'siguente');
    }
});



















ngDevhres
    .directive('appPagination', function() {
        return {
            scope: {

                query: '=',
                format: '=',
                display: '=',
                per: '=',
                page: '=',
                pages: '=',
                rango: '=',
                sort: '@',
                term: '@',
                accion: '&'
            },
            link: myLink2,
            templateUrl: 'app/views/directives/pagination/app_pagination.html',

        };

        function myLink2(scope, el, attrs) {
            scope.$watchCollection('[per,page,pages, display, rango, format, query]', function() {
                Algoritmo2(scope, attrs);
            });
        };

        function Algoritmo2(scope, attrs) {
            var rangeAlgorithms = {
                all: function(numPages, currentPage) {
                    var i,
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    for (i = 1; i <= numPages; i++) {
                        var params = {};
                        params.page = i;
                        pagesInRange.push({ page: i, params: params, cp: cp });
                    }
                    return pagesInRange;
                },
                jumping: function(numPages, currentPage, size) {
                    var i,
                        min = Math.floor(currentPage / size) * size,
                        max = Math.min(min + size - 1, numPages - 1),
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    cp.query = scope.query;
                    for (i = min + 1; i <= max + 1; i++) {
                        var params = {};
                        params.page = i;
                        params.query = scope.query;
                        pagesInRange.push({ page: i, params: params, cp: cp });
                    }
                    return pagesInRange;
                },
                sliding: function(numPages, currentPage, size) {
                    var i,
                        stepMin = Math.floor((size - 1) / 2),
                        stepMax = size - 1 - stepMin,
                        min = Math.max(0, currentPage - stepMin),
                        max = Math.min(currentPage + stepMax, numPages - 1),
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    while (min > 0 && max - min < size - 1) {
                        min--;
                    }
                    while (max < numPages - 1 && max - min < size - 1) {
                        max++;
                    }
                    for (i = min + 1; i <= max + 1; i++) {
                        var params = {};
                        params.page = i;
                        pagesInRange.push({ page: i, params: params, cp: cp });
                    }
                    return pagesInRange;
                }
            };

            function calculatePagesInRange(vl) {
                vl--;
                var currentPage = Math.max(1, Math.min(vl, numPages() ));
                return rangeAlgorithms[scope.format](parseInt(numPages()), currentPage, parseInt(scope.display));
            }

            function numPages() {
                // return Math.ceil(scope.count / scope.per);
                return scope.pages;
            }

            var params = {};


            function setVariables(num) {
                if (num == null) {
                    num = scope.page;
                }
                params.query = scope.query;

                scope.nextParams = {};
                scope.nextParams.page = (parseInt(num) + 1);
                angular.extend(scope.nextParams, params);

                scope.endParams = {};
                scope.endParams.page = scope.pages; //numPages();
                angular.extend(scope.endParams, params);

                scope.prevParams = {};
                scope.prevParams.page = (parseInt(num) - 1);
                angular.extend(scope.prevParams, params);

                scope.startParams = {};
                scope.startParams.page = 1;
                angular.extend(scope.startParams, params);

                //scope.count = parseInt(scope.count);
                //scope.per = parseInt(scope.per);
                scope.pagesInRange = calculatePagesInRange(parseInt(num));
                var firstPageInRange = scope.pagesInRange[0];
                var lastPageInRange = scope.pagesInRange[scope.pagesInRange.length - 1];
                
                scope.firstPageInRange = calculatePagesInRange(parseInt(firstPageInRange.page) - 1);
                scope.lastPageInRange = calculatePagesInRange(parseInt(lastPageInRange.page) + 1);
                //scope.$state = $state;
                //scope.currentPage = num;
                //scope.pages = scope.pages; //numPages();
                //scope.rango = scope.rango;
            }

            setVariables();
            scope.listpag = function(params, num) {
                scope.accion({ params: params });
                setVariables(num);
            };
        }

    });





/*
var myutil = angular.module("myutil", []);

myutil.value("safeValue", "a safe value");

myutil.factory("safeFactory", ['safeValue', function(p1) {
    return { value : p1 };
}]);
function MySafeService(p1){
    this.doIt = function() {
        return "MySafeService.doIt() called: " + p1.value;
    };
}
myutil.service("safeService", ['safeFactory', MySafeService]);

myutil.provider("$safeService2", function() {
    var provider = {};
    provider.$get = ['safeService', function(p1) {
        var service = {};
        service.doService = function() {
            console.log("safeService from provider: " + p1.doIt());
        };
        return service;
    }];
    return provider;
});

*/
