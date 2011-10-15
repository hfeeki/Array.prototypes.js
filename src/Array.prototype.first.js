/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// Returns first element in array, or first element that matches a predicate fn

Array.prototype.first = function(fn, scope) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!this || Object.prototype.toString.call(arg) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    // No predicate? Return first element

    if (typeof fn === 'undefined') {
        return this[0];
    }

    // Return first element that meets predicate

    if (typeof fn !== 'function') {
        throw new TypeError("Optional `argument[0]` must be predicate function if defined");
    }

    for (var i = 0, l = this.length; i < l; i++) {
        var element = this[i];
        if (fn.call(scope || this, element, i, this)) {
            return element;
        }
    }
};