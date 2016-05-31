define(['app'], function(app) {
    'use strict';

    var AuthService = function($http, $window, API) {
        this.$http = $http;
        this.$window = $window;
        this.uri = API + '/auth';
    };

    AuthService.prototype.register = function(user) {
        var svc = this;
        return this.$http.post(this.uri + '/register', user).success(function(data) {
            svc.saveToken(data.token);
        });
    };

    AuthService.prototype.logIn = function(user) {
        var svc = this;
        return this.$http.post(this.uri + '/login', user).success(function(data) {
            svc.saveToken(data.token);
        });
    };

    AuthService.prototype.logOut = function() {
        this.$window.localStorage.removeItem('base-token');
    };

    AuthService.prototype.isLoggedIn = function() {
        var token = this.getToken();

        if (token) {
            var payload = JSON.parse(this.$window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    AuthService.prototype.currentUser = function() {
        if (this.isLoggedIn()) {
            var token = this.getToken();
            var payload = JSON.parse(this.$window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    AuthService.prototype.saveToken = function(token) {
        this.$window.localStorage['base-token'] = token;
    };

    AuthService.prototype.getToken = function() {
        return this.$window.localStorage['base-token'];
    };

    AuthService.$inject = ['$http', '$window', 'API'];

    app.service('authService', AuthService);
});
