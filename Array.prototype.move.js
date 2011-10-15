/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// Takes an

Array.prototype.move = function(from, to) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!this || Object.prototype.toString.call(arg) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    if (typeof from !== 'number') {
        throw new TypeError("argument[0] must be number, not " + typeof from);
    }

    if (typeof to !== 'number') {
        throw new TypeError("argument[1] must be number, not " + typeof to);
    }

    // TODO eh? any better way?

    var element = this[from];

    this.splice(from, 1);
    this.splice(to, 0, element);

    return this;
};