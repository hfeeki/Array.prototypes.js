// Returns last element in array, or last element that matches a predicate fn

Array.prototype.last = function(fn, scope) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // No predicate? Return last element

    if (typeof fn === 'undefined') {
        return this[this.length - 1];
    }

    // Return last element that meets predicate

    if (typeof fn !== 'function') {
        throw new TypeError("Optional argument[0] must be predicate function if defined");
    }

    for (var i = this.length; i >= 0; i--) {
        var element = this[i];
        if (fn.call(scope || this, element, i, this)) {
            return element;
        }
    }
};
