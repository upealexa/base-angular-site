define([
    'app'
], function(app) {

    function FacebookLoginController($state, $translatePartialLoader, $translate, authService) {
        this.$state = $state;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        this.authService.facebookLogIn();
    }

    FacebookLoginController.$inject = ['$state', '$translatePartialLoader', '$translate', 'authService'];

    app.controller('facebookLoginController', FacebookLoginController);

    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('facebook_login', {
                    url: '/facebook_login',
                    templateUrl: 'src/modules/accessControl/facebookLogin/facebookLogin.tpl.html',
                    controller: 'facebookLoginController',
                    controllerAs: 'vm',
                    onEnter: ['$state', 'authService', function($state, authService) {
                        if (authService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                });
        }
    ]);
});
