// Returns first element in array, or first element that matches a predicate fn

Array.prototype.first = function(fn) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // No predicate? Return first element

    if (typeof fn === 'undefined') {
        return this[0];
    }

    // Return first element that meets predicate

    if (typeof fn !== 'function') {
        throw new TypeError("Optional `argument[0]` must be predicate function if defined");
    }

    for (var i = 0, l = this.length; i < l; i++) {
        var element = this[i];
        if (fn.call(this, element, i, this)) {
            return element;
        }
    }
};
