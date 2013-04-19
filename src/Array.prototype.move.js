// Takes an exiting element in the array and moves it to a new position

Array.prototype.move = function(from, to) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    if (typeof from !== 'number') {
        throw new TypeError("argument[0] must be number, not " + typeof from);
    }

    if (typeof to !== 'number') {
        throw new TypeError("argument[1] must be number, not " + typeof to);
    }

    var element = this[from];

    this.splice(from, 1);
    this.splice(to, 0, element);

    return this;
};