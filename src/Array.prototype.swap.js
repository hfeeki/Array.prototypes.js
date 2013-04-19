// Returns last element in array, or last element that matches a predicate fn

Array.prototype.swap = function(a, b) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }
    
    if (typeof a !== 'number') {
        throw new TypeError("argument[0] must be number, not " + typeof a);
    }

    if (typeof b !== 'number') {
        throw new TypeError("argument[1] must be number, not " + typeof b);
    }

    var temp = this[a];
    
    this[a] = this[b];
    this[b] = temp;
    
    return this;
};