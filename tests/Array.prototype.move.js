(function(Verify) {

    Verify.require("../src/Array.prototype.move.js");

    /*

        // inline test execution:

        Verify.test("Throws when this is null", function(assert) {

        });

        Verify.run();

    */

    Verify.push("Array `remove()` prototype", [
        {
            verify: "Throws when `this` is not an Array",
            test: function(assert) {
                var foo;

                assert(function() {
                    Array.prototype.move.call(foo, 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call({}, 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call(true, 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call(49, 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call(null, 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call("string", 0);
                }).throws(TypeError);

                assert(function() {
                    Array.prototype.move.call(function(){}, 0);
                }).throws(TypeError);
            }
        },
        {
            verify: "Returns `this` Array it acts on",
            test: function(assert) {
                var array = [1, "<", 2];
                assert(array.move(0, 1)).is(array);
            }
        },
        {
            verify: "TODO: What happens when I do this? Does this pass? Should it throw when from === to?",
            test: function(assert) {
                assert(["a"].move(0, 0)).defined();
            }
        },
        {
            verify: "Relocates element to new index",
            test: function(assert) {
                assert(
                    [
                        "chris",
                        "farah",
                        "lola"
                    ]
                    .move(0, 2)
                    .move(1, 0)
                )
                .identical([
                    "lola",
                    "farah",
                    "chris"
                ]);
            }
        }
    ]);

})(Verify);