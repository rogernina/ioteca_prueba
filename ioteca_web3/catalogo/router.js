app

//==================================
// catalogo routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    //==================================
    // catalogo layout base
    //==================================
        .state('catalogo', {
        url: '/catalogo',
        views: {
            '': {
                templateUrl: 'app/views/layout.html'
            },
            'aside': {
                templateUrl: 'app/views/aside.html'
            },
            'content': {
                templateUrl: 'app/views/content.html'
            }
        }
    })

    //==================================
    // url ct
    //==================================
    .state("catalogo.ct", {
        url: "/ct",
        data: { section: 'Catálogo', page: 'Document' },
        templateUrl: "app/views/pages/document.html"
    })

    //==================================
    // url categoria
    //==================================
    .state("catalogo.categoria", {
        url: "/categoria",
        data: { section: 'Catálogo', page: 'Categoría' },
        templateUrl: "catalogo/views/categoria/index.html"
    })

    //==================================
    // url autor
    //==================================
    .state("catalogo.autor", {
        url: "/autor",
        data: { section: 'Catálogo', page: 'Autor' },
        templateUrl: "catalogo/views/autor/index.html"
    });
});
