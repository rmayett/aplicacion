define( [ 'require', '$App/storage/basestorage', '$App/mapping/mep' ], function( require ){

    var Storage = require( '$App/storage/basestorage' ),
        MEP = require( '$App/mapping/mep' );

    function SessionStorage(name, type) {
        this.name = name;
        this.type = type;
    }

    SessionStorage.prototype = Object.create(Storage.prototype);
    SessionStorage.prototype.constructor = SessionStorage;

    SessionStorage.prototype.get = function (path) {
        var data = sessionStorage.getItem(this.name);

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

    SessionStorage.prototype.set = function (value) {
        if (value === undefined) {
            sessionStorage.removeItem(this.name);
        } else if (this.type === "String") {
            sessionStorage.setItem(this.name, value);
        } else {
            sessionStorage.setItem(this.name, JSON.stringify(value));
        }
    };

    return SessionStorage;
});
