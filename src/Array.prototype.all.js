/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// Whether all the elements in an array match a predicate function

Array.prototype.all = function(fn, scope) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!this || Object.prototype.toString.call(arg) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    for (var i = 0, l = this.length; i < l; i++) {
        if (!fn.call(scope || this, this[i], i, this)) {
            return false;
        }
    }

    return true;
};