app
//------------------------------
// TODO: API menu
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
    .factory("menuService", function() {

    var sections = [
        /*
        {
          title: 'Getting Started',
          state: 'getting-started',
          url: '/getting-started',
          type: 'link'
        }
        */
    ];

    sections.push({
        title: 'Dashboard',
        state: 'app.dashboard',
        type: 'link'
    });

    sections.push({
        //title: 'Sección ui',
        //type: 'heading',
        children: [{
            title: 'U.I.',
            type: 'toggle',
            group: 'ui',
            pages: [{
                title: 'Test 1 uno más',
                state: 'ui.test1',
                type: 'link'
            }, {
                title: '2Test 2',
                state: 'ui.test2',
                type: 'link'
            }, {
                title: 'Test 3',
                state: 'ui.test3',
                type: 'link'
            }, {
                title: 'Test 4',
                state: 'ui.test4',
                type: 'link'
            }, {
                title: 'Test 5',
                state: 'ui.test5',
                type: 'link'
            }, ]
        }]
    });

    sections.push({
        title: 'Sec. catalogo',
        type: 'heading',
        children: [{
            title: 'Catálogo',
            type: 'toggle',
            group: 'catalogo',
            pages: [{
                title: 'Cat t',
                state: 'catalogo.ct',
                type: 'link'
            }, {
                title: 'Categoría',
                state: 'catalogo.categoria',
                type: 'link'
            },{
                title: 'Autor',
                state: 'catalogo.autor',
                type: 'link'
            }, ]
        }]
    });

    return {
        sections: sections,
    };
});
