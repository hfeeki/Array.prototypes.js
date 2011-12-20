/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// Returns last element in array, or last element that matches a predicate fn

Array.prototype.last = function(fn, scope) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // No predicate? Return last element

    if (typeof fn === 'undefined') {
        return this[this.length];
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