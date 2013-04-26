Verify.require("../src/Array.prototype.flatten.js");
    
Verify.push("Array `flatten()` prototype", [
    {
        verify: "Defines Array.prototype.flatten",
        test: function(assert) {
            assert('flatten' in Array.prototype).is(true);
        }
    },
    {
        verify: "Returns an Array",
        test: function(assert) {
            assert([].flatten()).isArray();
            assert([undefined, null, 0, {}, [], false].flatten()).isArray();
        }
    },
    {
        verify: "Returned Array is flat",
        test: function(assert) {
            var jagged = [],
                flat = jagged.flatten();
                
            assert().fail('TODO');
        }
    }
]);