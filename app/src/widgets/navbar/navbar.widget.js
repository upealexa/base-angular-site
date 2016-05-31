define([
    'app'
], function(app) {

    app.directive('navBar', [function() {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/widgets/navbar/navbar.widget.tpl.html',
            controller: ['$scope', 'authService', function($scope, authService) {
                $scope.logged = function() {
                    return authService.isLoggedIn();
                };
                $scope.currentUser = function() {
                    return authService.currentUser();
                };
                $scope.logOut = function() {
                    authService.logOut();
                };
            }]
        };

    }]);
});
