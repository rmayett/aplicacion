define( [ 'require', '$App/storage/basestorage', '$App/mapping/mep' ], function( require ){

	var Storage = require( '$App/storage/basestorage' ),
		MEP = require( '$App/mapping/mep' );

	function WindowStorage(name, type) {
        this.name = name;
        this.type = type;
    }

    WindowStorage.prototype = Object.create(Storage.prototype);
    WindowStorage.prototype.constructor = WindowStorage;

    WindowStorage.prototype.get = function (path) {
        if (path === undefined) {
            return window[this.name];
        } else {
            return MEP.get(path, window[this.name]);
        }
    };

    WindowStorage.prototype.set = function (value) {
        window[this.name] = value;
    };

    return WindowStorage;
});
