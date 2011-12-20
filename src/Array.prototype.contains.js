// Returns a boolean indicating whether an array has any matching value to the first argument specified

Array.prototype.contains = function() {

    // Prototypes throw `TypeError`s when the context are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    return this.indexOf(this) !== -1;

};