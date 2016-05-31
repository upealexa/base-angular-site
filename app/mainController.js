define([
    'app'
], function(app) {

    function Controller($scope, $location, $rootScope, authService) {
    }

    Controller.$inject = ['$scope', '$location', '$rootScope', 'authService'];

    app.controller('mainController', Controller);

});
