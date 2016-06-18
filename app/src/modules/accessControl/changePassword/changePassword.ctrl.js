define([
    'app'
], function(app) {

    function ChangePasswordController($state, $translatePartialLoader, $translate, authService) {
        this.$state = $state;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        this.user = {
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        };

        this.error = "";
        this.msg = "";
    }

    ChangePasswordController.prototype.changePassword = function() {
        ctrl = this;
        this.error = "";
        this.msg = "";

        this.myPromise = this.authService.changePassword(this.user).error(function(error) {
            ctrl.error = error;
        }).then(function(data) {
          ctrl.msg = data.data.msg;
        });
        return this.myPromise;
    };

    ChangePasswordController.$inject = ['$state', '$translatePartialLoader', '$translate', 'authService'];

    app.controller('changePasswordController', ChangePasswordController);

    app.config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('change_password', {
                    url: '/change_password',
                    templateUrl: 'src/modules/accessControl/changePassword/changePassword.tpl.html',
                    controller: 'changePasswordController',
                    controllerAs: 'vm',
                    onEnter: ['$state', 'authService', function($state, authService) {
                        if (!authService.isLoggedIn()) {
                            $state.go('home');
                        }
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }
    ]);
});
