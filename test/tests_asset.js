/* move into tests*/
(function(require){
    var config = {
        baseUrl: "app",
        paths: {
            'jasmine_f': '../libs/jasmine/lib/jasmine-core',
            'unit_tests': '../test/units',
            //'test_modules': 'test/pages',
            // target_code dependencies
            '$App': '../libs/apperyio',
            'lodash': '../libs/lodash/dist/lodash',
            'angular' : '../libs/angular/angular',
            'angular-mocks' : '../libs/angular-mocks/angular-mocks',
            'mocks': '../test/mocks',
            '$squire': '../libs/squire/src/Squire',
            '$mocks_resolver': '../test/mocks_resolver'
        },
        shim: {
            'jasmine_f/boot': {
                deps: ['jasmine_f/jasmine-html']
            },
            'jasmine_f/jasmine-html': {
                deps: ['jasmine_f/jasmine']
            },
            'angular-mocks' : {
                deps: ['angular']
            }
        }
    };
    require.config( config );

    require( ['require', 'lodash', 'jasmine_f/boot'], function( require ){
        require([
            'unit_tests/fconfig.spec',
            'unit_tests/fhelper.spec',
            'unit_tests/entityapi.spec'
        ], function(){
            window.onload();
        });
    });
}( require ));

