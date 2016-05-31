define([
    'app'
], function(app) {

    function LoginController($state, authService) {
        this.$state = $state;
        this.authService = authService;

        this.user = {
            username: '',
            password: ''
        };

        this.error = "";
    }

    LoginController.prototype.logIn = function() {
        ctrl = this;

        this.authService.logIn(this.user).error(function(error) {
            ctrl.error = error;
        }).then(function() {
            ctrl.$state.go('home');
        });
    };

    LoginController.$inject = ['$state', 'authService'];

    app.controller('loginController', LoginController);

    app.config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/modules/login/login.tpl.html',
                    controller: 'loginController',
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
