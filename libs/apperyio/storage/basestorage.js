define( [ 'require', 'jquery', '$App/mapping/mep' ], function( require ){

    var $ = require( 'jquery' ),
        MEP = require( '$App/mapping/mep' );

    function Storage() {
    }

    Storage.prototype.clear = function () {
        this.set(undefined);
    };

    Storage.prototype.update = function (path, value) {
        if (arguments.length === 0) return;

        var result = null;
        if (arguments.length === 1) {
            result = $.extend(true, this.get(), path); // path is a value in this case
        } else {
            result = MEP.merge(path, this.get(), value);
        }

        this.set(result);
        return result;
    };

    return Storage;
});
