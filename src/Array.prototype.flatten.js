// Returns a single Array of elements from a given array of arrays
// Example: [[0,1],[2,3],[4,5]].flatten() -> [0,1,2,3,4,5]

Array.prototype.flatten = function() {
    return [].concat.apply([], this);
};

