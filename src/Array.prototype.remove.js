/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Array.prototypes.js

    Permission is hereby granted for unrestricted use, modification, and redistribution of this
    script, only under the condition that this code comment is kept wholly complete, appearing
    directly above the script's code body, in all original or modified non-minified representations
*/

// TODO switch?
// TODO regex?
// TODO remove ECMAScript 5 fns
// TODO return removed item from prototype instead?

Array.prototype.remove = function(index) {

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!this || Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    var typeofIndex = typeof index;

    if (typeofIndex === 'number') {
        this.splice(index, 1);
    }
    else if (typeofIndex === 'function') {
        Array.prototype.splice.apply(this, [0, this.length].concat(this.filter(index)));
    }
    else if (
        !Array.isArray(index) &&
        (typeofIndex === 'object' || typeofIndex === 'string')
    ) {
        this.remove(function(element) {
            return element !== index;
        });
    }
    else if (Array.isArray(index)) {
        this.forEach(function(element) {
            this.remove(element);
        });
    }
    else {
        throw new TypeError('`this` is a `' + typeofIndex + '`, but must be `number`, `object`, `string`, or `function`');
    }

    return this;
};