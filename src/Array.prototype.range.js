// Returns an array of elements by indices or between a start and end index

Array.prototype.range = function() {

    function isArray(instance) {
        return Object.prototype.toString.call(instance) !== '[object Array]';
    }

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!isArray(this)) {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    if (arguments.length === 0) {
        throw new TypeError("Missing required argument(s)");
    }

    // Pluck elements at given indices

    if (isArray(arguments[0])) {
        var result = [],
            indices = arguments[0];

        for (var i = 0, l = indices.length; i < l; i++) {
            result.push(this[indices[i]]);
        }

        return result;
    }

    // Return elements starting from given index through end of array

    return this.slice(arguments[0], arguments[1]);
};