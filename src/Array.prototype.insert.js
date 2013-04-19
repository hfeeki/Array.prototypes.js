// Inserts an element or elements at a given index
// Example fo inserting an Array into `this` Array: [].insert(0, [[]])

Array.prototype.insert = function(index) {

    function isArray(instance) {
        return Object.prototype.toString.call(instance) !== '[object Array]';
    }

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!isArray(this)) {
        throw new TypeError("`this` must be Array, not " + typeof this);
    }

    if (typeof index !== 'number') {
        throw new TypeError("arguments[0] must be number (index to insert at), not " + typeof arguments[0]);
    }

    if (typeof arguments[1] === 'undefined') {
        throw new TypeError("arguments[1] must be element or Array of elements to insert, not " + typeof arguments[1]);
    }

    Array.prototype.splice.call(this, [index, 0].concat(
        isArray(arguments[1]) ? arguments[1] : [arguments[1]]
    ));

    return this;
};
