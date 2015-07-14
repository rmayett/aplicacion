/**
 * ApperyioProvider
 */
define(['require'
    , 'lodash'
    , 'routes'
    , '$App/entity/api'
    , 'services/models'
], function(require, _){

    var EntityAPI_provider = require('$App/entity/api');
    var app_models = require('services/models');
    var routes = require('routes');
    var extend = _.extend,
        forEach = each = _.each,
        isString = _.isString,
        isFunction = _.isFunction,
        isObject = _.isObject,
        isBoolean = _.isBoolean,
        isArray = _.isArray,
        map = _.map

    return function($rootScope,
                    $location,
                    $injector,
                    $q,
                    AConfig,
                    $parse,
                    $timeout){

        var appery__config = {},
            services = [],

            $A = {};

        $A = {
            init: function(options){
                extend(appery__config, options || {});
            },
            addValueToConfig: function(prop_name, value){
                if (value !== ""){
                    //console.log('value', value);
                    var prop_obj = {};
                    prop_obj[prop_name] = value;

                    var param_name = 'query.' + prop_name;
                    // console.log('param_name', param_name);
                    AConfig.configAdd(param_name, value);
                }
            },
            /**
             * Navigate to route by name
             * @param  {String} path    [description]
             * @param  {Object} options [description]
             */
            navigateTo: function( path, options ){
                var route_names = routes.route_names;

                if ( route_names.hasOwnProperty(path) ){
                    path = route_names[path];
                }
                if ( isObject(options) ){
                    each( options, function(v, k){
                        path = path.replace( ':' + k, v.toString() );
                    } );
                }

                path = path.replace('*\\/', '/')
                    .replace('*\\', '')
                    .replace('*', '')
                    .replace('?', '');

                $location.path( path );
            },

            url: function(template /*, options*/){
                var options = arguments[1] || {},
                    R = /\{([\w\d_\$\.]+?)\}/,
                    m = [],
                    tmp = '',
                    getter, value;
                options = extend(options, this.getAll());
                if (isFunction(template)){
                    return template.call(this, options);
                }
                m = template.match(R);
                tmp = template;
                while (m) {
                    getter = $parse(m[1]);
                    if (!_.isUndefined(value = getter(options))){
                        template = template.replace(m[0], value);
                        tmp = template;
                    } else {
                        tmp = template.replace(m[0], '');
                    }
                    m = tmp.match(R);
                }
                return template;
            },

            params_parse: function(obj /*, options*/){
                var options = arguments[1] || {},
                    result = {},
                    that = this;
                if (isString(obj) || isFunction(obj)){
                    return this.url(obj, options)
                }
                if (isBoolean(obj) || !isObject(obj)){
                    result = obj;
                } else {
                    if (isArray(obj)) {
                        result = [];
                    }
                    forEach(obj, function(value, key){
                        result[key] = that.params_parse(value, options)
                    });
                }
                return result;
            },

            log: function(){
                console.log.apply(console, arguments);
            },

            defer_get: function(name){
                var $timeout = this.get('$timeout');
                var $injector = this.get('$injector');
                var deferred = $q.defer();
                if ($injector.has(name)){
                    console.log('has name ' + name);
                    $timeout(function(){
                        deferred.resolve($injector.get(name));
                    }, 0);
                } else {
                    console.log('try to load ' + name);
                    require([name], function(c){
                        console.log('loaded ' + name);

                        $timeout(function(){

                            deferred.resolve(c);
                        }, 0);
                    })
                }
                return deferred.promise;
            },

            get: function(){
                return $injector.get.apply($injector, arguments);
            },

            getLibrary: function(){
                return require.apply(null, arguments);
            },

            registerService: function(name){
                if (services.indexOf(name) === -1 && isString(name) && name.length > 0){
                    services.push(name);
                } else {
                    console.warn("Service '" + name + "' already registered");
                }
                return services;
            },
            getServices: function(){
                return services;
            },

            isServiceRegistred: function(name){
                return services.indexOf(name) >= 0;
            }
        };


        var EntityAPI = new EntityAPI_provider.EntityFactory(app_models);
        $A.EntityAPI = EntityAPI.get.bind(EntityAPI);
        $A.EntityFactory = EntityAPI_provider.EntityFactory;
        $A.EntityTypeNotFoundError = EntityAPI_provider.TypeNotFoundError;
        $A = extend($A, AConfig);

        return $A;
    }
});
