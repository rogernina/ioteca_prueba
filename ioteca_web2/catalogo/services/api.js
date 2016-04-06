app

    .factory("API", function($resource, config) {
    var url = config.catalogoUrl;
    return {
        Categoria: $resource(url + "categorias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),
        Autor: $resource(url + "autors/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            //"list": { method: 'GET', isArray: false, params: { query: '@query', page: '@page', page_size: '@page_size' } }
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    if (r !== null) {
                        if (angular.fromJson(r).results === null) {
                            results = angular.fromJson(r);
                        } else {
                            results = angular.fromJson(r).results;
                        }
                        if (angular.fromJson(r).options === null) {
                            options = angular.fromJson(r);
                        } else {
                            options = angular.fromJson(r).options;
                        }
                        return { results: results, options: options };
                    }
                }
            },
            "options": {
                method: 'OPTIONS', isArray: false,
                transformResponse: function (r) {
                    return angular.fromJson(r).actions.POST;
                }
            }


        }),
        Libro: $resource(url + "libros/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }

        }),

    };
});
