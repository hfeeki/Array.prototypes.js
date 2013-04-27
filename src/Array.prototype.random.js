// Returns a random element in the Array

Array.prototype.random = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    return this[Math.floor(Math.random() * this.length)];
};
