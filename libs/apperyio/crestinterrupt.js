define( [ 'lodash', 'x2js' ], function( _, x2js ){
    var extend = _.extend,
        forEach = each = _.each,
        isString = _.isString,
        isFunction = _.isFunction,
        isArray = _.isArray,
        map = _.map;
    var x2jsInst = new x2js();
    var json2xml_str = x2jsInst.json2xml_str.bind( x2jsInst );
    var xml2json = x2jsInst.xml_str2json.bind( x2jsInst );

    function transform2form( obj ){
        var str = [];
        for (var key in obj) {
            if (obj[key] instanceof Array){
                for (var idx in obj[key]) {
                    var subObj = obj[key][idx];
                    for (var subKey in subObj) {
                        str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
                    }
                }
            }
            else {
                str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
            }
        }
        return str.join("&");
    };

    return function configRESTInt($provide, $httpProvider) {
        $provide.factory('RESTInt', [ 'Apperyio',
            function( Apperyio ) {
                return {
                    request: function( config ) {
                        if ( config.hasOwnProperty('aio_config') ){

                            switch ( config.aio_config.requestType.toLowerCase()) {
                                case 'xml': {
                                    config.data = json2xml_str( config.data );
                                    break;
                                }
                                case 'x-www-form-urlencoded':{
                                    config.data = transform2form( config.data );
                                    break;
                                }
                            }
                            if ( config.aio_config.responseType.toLowerCase() === 'jsonp' ) {
                                config.method = 'jsonp';
                            }
                        }
                        return config;
                    },

                    response: function( response ){
                        if ( response.config.hasOwnProperty('aio_config') ){
                            var c = response.config.aio_config;
                            if ( c.hasOwnProperty('responseType') && c.responseType.toLowerCase() === 'xml' ) {
                                response.data = xml2json( response.data );
                                if ( c.hasOwnProperty('serviceName') ) {
                                    var response_model_name = c.serviceName + '.response.body';
                                    response.data = Apperyio.EntityAPI( response_model_name, response.data );
                                }
                            }
                        }
                        return response;
                    }
                }
            }
        ]);
        $httpProvider.interceptors.push('RESTInt');
    };
});
