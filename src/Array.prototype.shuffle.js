/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// Randomizes the element ordering and returns the Array

Array.prototype.shuffle = function() {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!this || Object.prototype.toString.call(this) !== '[object Array]') {
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