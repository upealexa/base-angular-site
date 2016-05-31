define([
    'app'
], function(app) {

    function Controller($scope, $location, $rootScope, authService) {
        $rootScope.isLoggedIn = authService.isLoggedIn();
    }

    Controller.$inject = ['$scope', '$location', '$rootScope', 'authService'];

    app.controller('mainController', Controller);

});
