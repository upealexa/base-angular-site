define([
    'app'
], function(app) {

    app.directive('navBar', [function() {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/widgets/navbar/navbar.widget.tpl.html',
            controller: ['$scope',
                '$translatePartialLoader',
                '$translate',
                'authService',
                'translationService',
                function($scope, $translatePartialLoader, $translate, authService, translationService) {

                    $translatePartialLoader.addPart('auth');
                    $translate.refresh();

                    $scope.logged = function() {
                        return authService.isLoggedIn();
                    };
                    $scope.currentUser = function() {
                        return authService.currentUser();
                    };
                    $scope.logOut = function() {
                        authService.logOut();
                    };
                    $scope.useTranslation = function(lang) {
                        translationService.useTranslation(lang);
                    };

                }
            ]
        };

    }]);
});
