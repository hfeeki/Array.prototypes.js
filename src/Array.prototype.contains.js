// Returns a boolean indicating whether an array has any matching value to the first argument specified

Array.prototype.contains = function(value) {
    return Array.prototype.indexOf.call(this, value) !== -1;
};
