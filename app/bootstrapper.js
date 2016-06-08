require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "/",
    waitSeconds: 10,
    paths: {
        'angular': '../libs/angular/angular',
        'angular-ui-router': '../libs/angular-ui-router/release/angular-ui-router.min',
        'jquery': '../libs/jquery/dist/jquery.min',
        'bootstrap': '../libs/bootstrap-sass/assets/javascripts/bootstrap.min',
        'moment': '../libs/moment/min/moment-with-locales.min',
        'angular-translate': '../libs/angular-translate/angular-translate.min',
        'angular-translate-loader-partial': '../libs/angular-translate-loader-partial/angular-translate-loader-partial.min',
        'angular-messages': '../libs/angular-messages/angular-messages.min',
        'angular-busy': '../libs/angular-busy/dist/angular-busy.min'
    },
    shim: {
        'angular-ui-router': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-partial': ['angular'],
        'bootstrap': ['jquery'],
        'angular-messages' : ['angular'],
        'angular-busy': ['angular'],
        'app': ['angular',
            'angular-translate',
            //'angular-translate-loader-partial',
            'angular-ui-router',
            'angular-messages',
            'jquery',
            'bootstrap',
            'angular-busy'
        ]
    }
});

require(['app'], function() {
    require(['mainController', 'injectables', 'angular-translate', 'angular-translate-loader-partial'], function() {
        angular.bootstrap(document.documentElement, ['base']);
    });
});
