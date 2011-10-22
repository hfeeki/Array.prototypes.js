(function(global) {

    // Validate the context we're going to put verify.js into

    (function() {

        if (typeof global === 'undefined') {
            throw new TypeError('`global` closure argument is undefined');
        }

        if (typeof global.verify !== 'undefined') {
            throw new TypeError('`verify` is already defined; cannot continue loading verify.js');
        }

        if (typeof global.assert !== 'undefined') {
            throw new TypeError('`assert` is already defined; cannot continue loading verify.js');
        }

    })();

    // Gi'me some ECMAScript 5 goodness

    function isArray(thing) {
        return Object.prototype.toString.call(thing) === '[object Array]';
    }

    // Test result rendering function if global.verify.log isn't defined by verify.js user

    function logTest(assertion, msg) {
        var result = (assertion.passes) ? 'pass' : 'fail';

        document.body.innerHTML += [
            '<span class="time">', new Date().getTime(), '</span>&nbsp;',
            '<span class="', result, '">', result, '</span>&nbsp;',
            msg, '\n'
        ].join('');

        if (!assertion.passes) {
            document.body.innerHTML += new Array(13).join(' ') + (function() {
                if (assertion.forced) {
                    return 'assert.' + result + '(' + (assertion.message || '') + ')';
                }
                return 'assert(' + JSON.stringify(assertion.source) + ').' + assertion.assert + '(' + JSON.stringify(assertion.target) + ')';
            })() + '\n';
        }
    }

    // The outcome of an assertion; a dictionary of data about the test and its result

    function assertion(config) {
        Object.keys(config).forEach(function (key) {
            this[key] = config[key];
        }, this);
    }

    // Called within global.verify() by verify.js user; creates test functions for the context

    var assert = global.assert = function(source) {
        return {
            is: function(target) {
                throw new assertion({
                    passes: source === target,
                    source: source,
                    target: target,
                    assert: 'is'
                });
            },
            equalTo: function(target) {
                throw new assertion({
                    passes: source == target,
                    source: source,
                    target: target,
                    assert: 'equalTo'
                });
            },
            identicalTo: function(target) {
                throw new assertion({
                    passes: JSON.stringify(source) === JSON.stringify(target),
                    source: source,
                    target: target,
                    assert: 'identicalTo'
                });
            },
            greaterThan: function(target) {
                throw new assertion({
                    passes: source > target,
                    source: source,
                    target: target,
                    assert: 'greaterThan'
                });
            },
            lessThan: function(target) {
                throw new assertion({
                    passes: source < target,
                    source: source,
                    target: target,
                    assert: 'lessThan'
                });
            },
            defined: function() {
                throw new assertion({
                    passes: typeof source !== 'undefined',
                    source: source,
                    //target: target,
                    assert: 'defined'
                });
            },
            instanceOf: function(target) {
                throw new assertion({
                    passes: source instanceof target,
                    source: source,
                    target: target,
                    assert: 'instanceOf'
                });
            },
            "in": function(target) {
                throw new assertion({
                    passes: source in target,
                    source: source,
                    target: target,
                    assert: 'in'
                });
            },
            throws: function(target) {
                throw new assertion({
                    passes: (function() {
                        try {
                             source();
                             return false;
                        }
                        catch(error) {
                            if (typeof target === 'undefined') {
                                return true;
                            }
                            return error instanceof target;
                        }
                    })(),
                    source: source,
                    target: target,
                    assert: 'throws'
                });
            },
            isArray: function() {
                throw new assertion({
                    passes: Array.isArray(source),
                    source: source,
                    //target: target,
                    assert: 'isArray'
                });
            },
            isObject: function() {
                throw new assertion({
                    passes: typeof source === 'object',
                    source: source,
                    //target: target,
                    assert: 'isObject'
                });
            },
            isNumber: function() {
                throw new assertion({
                    passes: typeof source === 'number',
                    source: source,
                    //target: target,
                    assert: 'isNumber'
                });
            },
            isString: function() {
                throw new assertion({
                    passes: typeof source === 'string',
                    source: source,
                    //target: target,
                    assert: 'isString'
                });
            },
            isBoolean: function() {
                throw new assertion({
                    passes: typeof source === 'boolean',
                    source: source,
                    //target: target,
                    assert: 'isBoolean'
                });
            },
            isFunction: function() {
                throw new assertion({
                    passes: typeof source === 'function',
                    source: source,
                    //target: target,
                    assert: 'isFunction'
                });
            }
        };
    };

    // Forces the test to abort with a passing result

    global.assert.pass = function() {
        throw new assertion({
            passes: true,
            forced: true
        });
    };

    global.assert.fail = function(message) {
        throw new assertion({
            passes: false,
            forced: true,
            message: message
        });
    };


    // The library we're exporting, yay!

    global.Verify = {};

    // Invoke a test; wrapper for assert()s--catches and pipes failed assertions to log

    global.Verify.test = function(expectation, test) {
        try {
            test();
        }
        catch(assertion) {
            assertion.test = test;
            assertion.expectation = expectation;
            (global.Verify.log || logTest)(assertion);
        }
    };

    // Add a test to the runner queue; queue starts consuming/executing tests via global.verify.run()

    var testQ = [];

    global.Verify.push = function(/* string */ moduleName, /* Array */ tests) {

        // Verify arguments for public static

        if (
            arguments.length !== 2 ||
            typeof moduleName !== 'string' ||
            !isArray(tests)
        ) {
            throw new TypeError("");
        }

        // Add moduleName data to tests

        for (var i = 0, l = tests.length; i < l; i++) {
            tests[i].moduleName = moduleName;
        }

        // Add the tests to the queue

        Array.prototype.splice.apply(testQ, [testQ.length, 0].concat(tests));
    };

    // Execute all the tests by emptying queue

    global.Verify.run = function(/* params string "tests to load" */) {

        if (
            arguments.length > 0 &&
            (arguments.length !== 1 || !isArray(arguments))
        ) {
            // TODO
            throw new TypeError();
        }

        // Run the test (wrapper)

        function run() {
            global.Verify.testQ.forEach(function(test) {
                global.Verify.test(test.verify, test.test);
            });
        }
        // Load all requirements and execute run() when it's done

        if (arguments.length) {
            global.Verify.require.call(arguments.concat([run]));
        }

        // Or run immediately without requiring anything

        else {
            run();
        }
    };

    // Add a method to import test dependencies (e.g. the sources they're testing!)

    global.Verify.require = function() {

    };

        var requires = [];  /* a map of


                            */

        verify.require = function() {

            function load(url) {
                var script = document.createElement("script");
                script.src = url;
                script.onload = onload;
                script.onerror = onerror;
                document.head.appendChild(script);
            }

            function onload() {
                // `this` is HTMLScriptElement
                requires = requires.slice(requires.indexOf(this.src), 1);

                if (requires.length === 0) {

                }
            }

            function onerror() {
                // `this` is HTMLScriptElement
            }

            function requiresDone

            Array.prototype.slice.call(arguments).forEach(function(url) {
                requires[url] = false;
             });
        };

})(this);