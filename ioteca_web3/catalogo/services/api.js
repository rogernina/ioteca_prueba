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
            "list": { method: 'GET', isArray: false, params: { query: '@query', page: '@page', page_size: '@page_size' } }

        }),
        Libro: $resource(url + "libros/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }

        }),

    };
});
