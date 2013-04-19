//TODO
// Returns whether two Arrays have the same elements in the same order

Array.prototype.same = function(comparisons, unordered) {
    // [1, 9].same([9, 1]);
    // [1, 9].same([9, 1], true);
    // [1, 9].same([9, 1], false);
    // [1, 9].same([1, 9]);
    // [1, 9].same([1, 9], true);
    // [1, 9].same([1, 9], false);
    // [1, 9].same([1, 9], [9, 1]);
    // [1, 9].same([1, 9], [9, 1], true);
    // [1, 9].same([1, 9], [9, 1], false);
    // [1, 9].same([1, 9], [1, 9]);
    // [1, 9].same([1, 9], [1, 9], true);
    // [1, 9].same([1, 9], [1, 9], false);
    // [].same([]);
    // [].same([], true);
    // [].same([], false);
    // [].same([]);
    // [].same([], []);
    // [].same([], [], true);
    // [].same([], [], false);

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    var arglen = arguments.length;

    if (arglen < 1) {
        throw new TypeError("`arguments` must have at least one comparison `Array`");
    }

    var firstarg = arguments[0];

    if (arglen === 1 && Object.prototype.toString.call(firstarg) !== '[object Array]') {

    }

    var lastarg = arguments[arguments.length - 1],
        typeof

    if (arguments.length >= 2) {
        var lastArg = arguments[arguments.length - 1];

        if (typeof arguments[arguments.length - 1] === 'boolean') {

        }
    }


};