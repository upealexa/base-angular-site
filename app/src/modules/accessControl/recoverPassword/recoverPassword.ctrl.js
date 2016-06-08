define([
    'app'
], function(app) {

    function RecoverPasswordController($state, $translatePartialLoader, $translate, authService) {
        this.$state = $state;
        this.$translate = $translate;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        this.user = {
            email: ''
        };
        this.error = "";
        this.msg = "";
    }

    RecoverPasswordController.prototype.recoverPassword = function() {
        ctrl = this;
        this.myPromise = this.authService.recoverPassword(this.user.email).error(function(error) {
            ctrl.error = error;
        }).then(function() {
          ctrl.msg = "Password sent";
        });

        return this.myPromise;
    };

    RecoverPasswordController.$inject = ['$state', '$translatePartialLoader', '$translate', 'authService'];

    app.controller('recoverPasswordController', RecoverPasswordController);

    app.config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('recover_password', {
                    url: '/recover_password',
                    templateUrl: 'src/modules/accessControl/recoverPassword/recoverPassword.tpl.html',
                    controller: 'recoverPasswordController',
                    controllerAs: 'vm',
                    onEnter: ['$state', 'authService', function($state, authService) {
                        if (authService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }
    ]);
});
