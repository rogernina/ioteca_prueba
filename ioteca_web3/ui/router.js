

app
//==================================
// ui app routers
//==================================
    .config(function($stateProvider) {

    $stateProvider
    //==================================
    // ui layout base
    //==================================
        .state('ui', {
        url: '/ui',
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
    // test1
    //==================================
    .state("ui.test1", {
        url: "/test1",
        data: { section: 'UI', page: 'Test 1 uno más' },
        settings: {
            loginRequired: true,
            roles: ['User'],
        },
        templateUrl: "ui/views/tests/test1.html",
        resolve: {
            checkSecurity: checkSecurity,
        },

    })

    //==================================
    // test
    //==================================
    .state("ui.test2", {
        url: "/test2",
        data: { page: 'Test 2' },
        templateUrl: "ui/views/tests/test2.html",
        resolve: {
            checkSecurity: checkSecurity,
        },
        settings: {
            loginRequired: false,
            roles: ['User2'],
        },
    })

    //==================================
    // test3
    //==================================
    .state("ui.test3", {
        url: "/test3",
        data: { page: 'Test 3' },
        templateUrl: "ui/views/tests/test3.html"
    })

    //==================================
    // test4
    //==================================
    .state("ui.test4", {
        url: "/test4",
        data: { section: 'UI', page: 'Test 4' },
        templateUrl: "ui/views/tests/test4.html"
    })


    ;
});
