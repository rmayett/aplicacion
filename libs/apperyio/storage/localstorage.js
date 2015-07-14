define( [ 'require', '$App/storage/basestorage', '$App/mapping/mep' ], function( require ){

    var Storage = require( '$App/storage/basestorage' ),
        MEP = require( '$App/mapping/mep' );

    function LocalStorage(name, type) {
        this.name = name;
        this.type = type;
    }

    LocalStorage.prototype = Object.create(Storage.prototype);
    LocalStorage.prototype.constructor = LocalStorage;

    LocalStorage.prototype.get = function (path) {
        var data = localStorage.getItem(this.name);

        if (data === null) return undefined;
        if (this.type === "String") return data;

        try {
            data = JSON.parse(data);
        } catch (e) {
            // intentionally left empty
        }

        if (path === undefined) {
            return data;
        } else {
            return MEP.get(path, data);
        }
    };

    LocalStorage.prototype.set = function (value) {
        if (value === undefined) {
            localStorage.removeItem(this.name);
        } else if (this.type === "String") {
            localStorage.setItem(this.name, value);
        } else {
            localStorage.setItem(this.name, JSON.stringify(value));
        }
    };

    return LocalStorage;
});
