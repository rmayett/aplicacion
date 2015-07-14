define(['require', 'angular', 'angular-touch', '$App/fmodals', '$App/fhelper', '$App/fconfig', 'ui-bootstrap', "angular-route", '$App/crouterconfig', '$App/crestinterrupt', '$App/frest'], function(require, angular) {
    /**
     * Main module for all modules
     */
    return angular.module('Apperyio', ['ngTouch', 'ui.bootstrap', 'ngRoute']).factory('Apperyio.Config', ['$parse', require('$App/fconfig')]).factory('Apperyio', ['$rootScope', "$location", "$injector", '$q', 'Apperyio.Config', '$parse', '$timeout', require('$App/fhelper')]).factory('Modals', ['$templateCache', 'Apperyio', require('$App/fmodals')])

    .factory('REST', ['Apperyio', require('$App/frest')])

    .config(["$provide", "$httpProvider", require('$App/crestinterrupt')])

    /**
     * Run actions
     */
    .run(["$rootScope", run_code]);

    function run_code($rootScope) {
        /**
         * Checking and reaction for online and offline states
         */
        $rootScope.online = navigator.onLine ? 'online' : 'offline';
        $rootScope.$apply();
        if (window.addEventListener) {
            window.addEventListener("online", goOnline, true);
            window.addEventListener("offline", goOffline, true);
        } else {
            document.body.ononline = goOnline;
            document.body.onoffline = goOffline;
        }

        function goOnline() {
            $rootScope.online = true;
            $rootScope.$apply();
        };

        function goOffline() {
            $rootScope.online = false;
            $rootScope.$apply();
        };
    };
});