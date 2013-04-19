// Returns an array of all the distinct elements in a given Array

Array.prototype.unique = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    var unique = [];

    for (var i = 0, l = this.length; i < l; i++) {
        var element = this[i];

        if (unique.indexOf(element) === -1) {
            unique.push(element);
        }
    }

    return unique;
};