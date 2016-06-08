define(['app', 'moment'],
    function(app, moment) {
        moment.locale('pt-br');
        app.config([
            '$translateProvider',
            '$httpProvider',
            function($translateProvider, $httpProvider) {

                $httpProvider.defaults.headers.common["Accept-Language"] = 'pt-br';

                $translateProvider.useSanitizeValueStrategy(null);

                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '../../../translations/{lang}/{part}.json'
                });

                $translateProvider.preferredLanguage('pt-br');
            }
        ]);
    });
