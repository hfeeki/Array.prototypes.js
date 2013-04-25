// Randomizes the element ordering and returns the Array

Array.prototype.shuffle = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // No shuffle necessary

    var length = this.length;

    if (length <= 1) {
        return this;
    }

    // Fisher–Yates implementation ("gold standard" of shuffles)

    for (var i = this.length - 1; i; i--) {
        var randomIndex = Math.floor(Math.random() * (i - 1)),
            temp = this[i];

        this[i] = this[randomIndex];
        this[randomIndex] = temp;
    }

    return this;
};
