// Returns last element in array, or last element that matches a predicate fn

Array.prototype.intersect = function(fn, scope) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // TODO

};
