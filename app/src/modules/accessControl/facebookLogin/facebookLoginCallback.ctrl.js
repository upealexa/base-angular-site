define([
    'app'
], function(app) {

    function FacebookLoginCallbackController($state, $translatePartialLoader, $translate, $location, authService) {
        this.$state = $state;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        console.log($location.search().token);
        authService.saveToken($location.search().token);
    }

    FacebookLoginCallbackController.$inject = ['$state', '$translatePartialLoader', '$translate', '$location', 'authService'];

    app.controller('facebookLoginCallbackController', FacebookLoginCallbackController);

    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('facebook_login_callback', {
                    url: '/facebook_login_callback',
                    templateUrl: 'src/modules/accessControl/facebookLogin/facebookLogin.tpl.html',
                    controller: 'facebookLoginCallbackController',
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
