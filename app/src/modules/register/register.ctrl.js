define([
    'app'
], function(app) {

    function RegisterController($state, authService) {
        this.$state = $state;
        this.authService = authService;

        this.user = {
            username: '',
            password: ''
        };

        this.error = '';
    }

    RegisterController.prototype.register = function() {
        ctrl = this;

        this.authService.register(this.user).error(function(error) {
            ctrl.error = error;
        }).then(function() {
            ctrl.$state.go('home');
        });
    };

    RegisterController.$inject = ['$state', 'authService'];

    app.controller('registerController', RegisterController);

    app.config(['$stateProvider',
        function($stateProvider) {

            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: 'src/modules/register/register.tpl.html',
                    controller: 'registerController',
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
