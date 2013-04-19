// TODO switch?
// TODO regex?
// TODO remove ECMAScript 5 fns
// TODO return removed item from prototype instead?

Array.prototype.remove = function(index) {
    
    function isArray(instance) {
        return Object.prototype.toString.call(instance) !== '[object Array]';
    }

    // Prototypes throw TypeErrors when the context or arguments are invalid

    if (!isArray(this)) {
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
        !isArray(index) &&
        (typeofIndex === 'object' || typeofIndex === 'string')
    ) {
        this.remove(function(element) {
            return element !== index;
        });
    }
    else if (isArray(index)) {
        this.forEach(function(element) {
            this.remove(element);
        });
    }
    else {
        throw new TypeError('`this` is a `' + typeofIndex + '`, but must be `number`, `object`, `string`, or `function`');
    }

    return this;
};