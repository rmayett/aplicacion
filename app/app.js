define([
/**
 * System global resources
 */
"require", "angular", "angular-touch", "angular-route", "Apperyio", "cordova", "constants", "routes", "bootstrap", "$App/crouterconfig",
/**
 * Angular modules
 */
"angular-animate", "gmaps", '$Screens/indexController',
/**
 * Custom global resources
 */
"backButton", "navigateTo"], function() {
    var angular = require("angular"),
        _Appery = require("Apperyio"),
        routerConfig = require("$App/crouterconfig");
    var DEPENDENCIES_INDEX = 13;
    var DEPENDENCIES = Array.prototype.slice.call(arguments, DEPENDENCIES_INDEX);
    var __APP_NAME__ = 'app';

    /**
     * Adding angular modules to the application
     */
    var APP = angular.module(__APP_NAME__, ['Apperyio', "ngAnimate", "uiGmapgoogle-maps"]).config(["$routeProvider", '$controllerProvider', '$provide', '$locationProvider', '$compileProvider', '$filterProvider', Configuration]).run(["Apperyio", RUN]);

    function Configuration($routeProvider, $controllerProvider, $provide, $locationProvider, $compileProvider, $filterProvider) {

        APP.controller = $controllerProvider.register;
        APP.directive = $compileProvider.directive;
        APP.filter = $filterProvider.register;
        APP.factory = $provide.factory;
        APP.service = $provide.service;

        /**
         * Place for list of pages and routes
         */
        var routes = require('routes');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        angular.forEach(routes.when, function(route, path) {
            $routeProvider.when(path, routerConfig(route, APP));
        });
        $routeProvider.otherwise(routes.otherwise || routes.
    default);
        /**
         * Global dependencies resolver
         */
        if (DEPENDENCIES.length >= 0) {
            var deps = null;
            for (var i = 0, l = DEPENDENCIES.length; i < l; i++) {
                deps = DEPENDENCIES[i];
                if (angular.isArray(deps) && deps.length > 0 && angular.isArray(deps[0].deps)) {
                    try {
                        for (var j = 0, l2 = deps.length; j < l2; j++) {
                            APP[deps[j].type].call(APP, deps[j].name, deps[j].deps);
                        }
                    } catch (e) {
                        // angular or service level error
                        e.message = 'Error in ' + deps[j].name + "\nMessage: " + e.message;
                        throw new Error(e);
                    }
                }
            }
        }
        APP.controller('indexController', require('$Screens/indexController'));
    }

    function RUN(Apperyio) {
        Apperyio.init(require('constants'));
    }

    return APP;
});