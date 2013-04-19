// Returns a single Array of elements from a given array of arrays

Array.prototype.flatten = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    var flattened = [];

    for (var i = 0, l = this.length; i < l; i++) {
        flattened = flattened.concat(this[i]);
    }

    return flattened;
};