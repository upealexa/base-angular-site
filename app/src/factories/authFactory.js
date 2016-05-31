define(['app'], function(module, _) {
    'use strict';

    function AuthFactory($http, $window) {
        this.$http = $http;
        this.$window = $window;
    }

    AuthFactory.prototype.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            saveToken(data.token);
        });
    };

    AuthFactory.saveToken = function(token) {
        $window.localStorage['base-token'] = token;
    };

    AuthFactory.makeFactory = function() {
        return new AuthFactory();
    };

    AuthFactory.makeFactory.$inject = ['$http', '$window'];

    module.factory('authFactory', AuthFactory.makeFactory);
});
