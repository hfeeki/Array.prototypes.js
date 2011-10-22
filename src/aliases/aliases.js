(function() {
    var array = Array.prototype;
    array.all  = array.every;
    array.any  = array.has = array.some;
    array.each = array.forEach;
})();