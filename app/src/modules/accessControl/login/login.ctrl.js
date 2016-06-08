define([
    'app'
], function(app) {

    function LoginController($state, $translatePartialLoader, $translate, authService) {
        this.$state = $state;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        this.user = {
            username: '',
            password: ''
        };

        this.error = "";
    }

    LoginController.prototype.logIn = function() {
        ctrl = this;

        this.myPromise = this.authService.logIn(this.user).error(function(error) {
            ctrl.error = error;
        }).then(function() {
            ctrl.$state.go('home');
        });
        return this.myPromise;
    };

    LoginController.$inject = ['$state', '$translatePartialLoader', '$translate', 'authService'];

    app.controller('loginController', LoginController);

    app.config(['$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/modules/accessControl/login/login.tpl.html',
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
