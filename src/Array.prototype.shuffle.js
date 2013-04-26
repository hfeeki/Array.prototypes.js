// Randomizes the element ordering and returns the Array

Array.prototype.shuffle = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }
    
    // Fisher–Yates implementation ("gold standard" of shuffles)

    for (var i = length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * length),
            temp = this[i];

        this[i] = this[randomIndex];
        this[randomIndex] = temp;
    }

    return this;
};
