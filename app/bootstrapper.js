require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "/",
    waitSeconds: 10,
    paths: {
        'angular': '../libs/angular/angular.min',
        'angular-ui-router': '../libs/angular-ui-router/release/angular-ui-router.min',
        'jquery': '../libs/jquery/dist/jquery.min',
        'bootstrap': '../libs/bootstrap-sass/assets/javascripts/bootstrap.min'
    },
    shim: {
        'angular-ui-router': ['angular'],
        'bootstrap': ['jquery'],
        'app': ['angular', 'angular-ui-router', 'jquery', 'bootstrap']
    }
});

require(['app'], function() {
    require(['mainController', 'injectables'], function() {
        angular.bootstrap(document.documentElement, ['base']);
    });
});
