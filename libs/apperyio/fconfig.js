define( [ 'require', 'lodash' ], function( require ){
    var _ = require( 'lodash' );
        extend = _.extend,
        forEach = each = _.each,
        isString = _.isString,
        isFunction = _.isFunction,
        isObject = _.isObject,
        isUndefined = _.isUndefined,
        isBoolean = _.isBoolean,
        isArray = _.isArray,
        map = _.map;

    var _config = {};

    return function( $parse ){
    	return {
    		init: function( cfg ){
    			_config = extend( {}, cfg );
    		},
    		/**
             * getter for configuration, second parameter can be used as default
             * value for unknown options
             * @param  String key
             * @return Object
             */
            config: function( exp  /*, default*/ ) {
            	var getter, result;

                if (_config[ exp ] !== undefined) {
                    result = _config[ exp ];
                } else {
                	try{
                		getter = $parse(  exp  );

                		result = getter( _config );

                	} catch (e) {
                		// #TODO
                		console.warn('Apperyio.config( "' + arguments[0] + '" ) can\'t be find.');
                		result = arguments.length > 1 ? arguments[1] : undefined;
                	}
                }
                return result;
            },
            configAdd: function( exp, value ) {
                var f = $parse( exp );
                f.assign( _config, value );
            },
            getAll: function(){
                return _config;
            },
            remove: function( exp ){
            	var result = this.config( exp );
            	this.configAdd( exp );
            	return result;
            }
    	}
    }
});
