define( [ 'require',
	'$App/storage/basestorage',
	'$App/storage/windowstorage',
	'$App/storage/localstorage',
	'$App/storage/sessionstorage'
	], function( require ){
	"use strict";

    var Storage = require( '$App/storage/basestorage' );

    var WindowStorage = require( '$App/storage/windowstorage' );

    var LocalStorage = require( '$App/storage/localstorage')

    var SessionStorage = require( '$App/storage/sessionstorage' );

    return {
    	Storage: Storage,
    	WindowStorage: WindowStorage,
    	LocalStorage: LocalStorage,
    	SessionStorage: SessionStorage
    }
});
