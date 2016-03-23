app

    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}])

.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
})

.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
})

//==================================
// app main routers
//==================================
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/apps");

    $stateProvider

    //==================================
    // Page not found
    //==================================
        .state("404", {
        url: "/404",
        data: { page: 'Error 404 Page not found' },
        templateUrl: "app/views/pages/404.html"
    })

    //==================================
    // Not Authorized page
    //==================================
    .state("notauthorized", {
        url: "/notauthorized",
        templateUrl: "app/views/pages/notauthorized.html"
    })

    //==================================
    // Apps page (Main)
    //==================================
    .state("apps", {
        url: "/apps",
        data: { page: 'Apps page' },
        views: {
            '': {
                templateUrl: "app/views/pages/apps.tmpl.html"
            },
        }
    })

    //==================================
    // App layout base
    //==================================
    .state('app', {
        url: '/app',
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
    // dashboard page
    //==================================
    .state("app.dashboard", {
        url: "/dashboard",
        data: { page: 'Dashboard page' },
        views: {
            '': {
                templateUrl: "app/views/pages/dashboard.wall.html"
            },
        }
    })


    ;


});
