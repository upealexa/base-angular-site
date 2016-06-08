define(['app'], function(app) {
    'use strict';

    var TranslationService = function($translate, $http) {
        this.$translate = $translate;
        this.$http = $http;
    };

    TranslationService.prototype.useTranslation = function(lang) {
        this.$translate.use(lang);
        this.$http.defaults.headers.common["Accept-Language"] = lang;
    };

    TranslationService.$inject = ['$translate', '$http'];

    app.service('translationService', TranslationService);
});
