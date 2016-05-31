define([
    'app'
], function(app) {

    function HomeController () {

    }

    HomeController.$inject = [];

    app.controller('homeController', HomeController);

    app.config(['$stateProvider',
        function($stateProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'src/modules/home/home.tpl.html',
                    controller: 'homeController',
                    controllerAs: 'vm'
                });
        }
    ]);

});
