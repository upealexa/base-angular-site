define([
    'app'
], function(app) {

    app.directive('navBar', [function() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                logged: '='
            },
            templateUrl: 'src/widgets/navbar/navbar.widget.tpl.html',
            controller: ['$scope', '$window', 'authService', function($scope, $window, authService) {
                $scope.logged = authService.isLoggedIn;
                $scope.currentUser = authService.currentUser;
                $scope.logOut = authService.logOut;
            }]
        };

    }]);
});
