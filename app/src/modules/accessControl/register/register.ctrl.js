define([
    'app'
], function(app) {

    function RegisterController($state, $translatePartialLoader, $translate, authService) {
        this.$state = $state;
        this.authService = authService;

        $translatePartialLoader.addPart('auth');
        $translate.refresh();

        this.user = {
            username: '',
            email: '',
            password: ''
        };

        this.error = '';
    }

    RegisterController.prototype.register = function() {
        ctrl = this;

        this.myPromise = this.authService.register(this.user).error(function(error) {
            ctrl.error = error;
        }).then(function() {
            ctrl.$state.go('home');
        });

        return this.myPromise;
    };

    RegisterController.$inject = ['$state', '$translatePartialLoader', '$translate', 'authService'];

    app.controller('registerController', RegisterController);

    app.config(['$stateProvider',
        function($stateProvider) {

            $stateProvider
                .state('register', {
                    url: '/register',
                    templateUrl: 'src/modules/accessControl/register/register.tpl.html',
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
