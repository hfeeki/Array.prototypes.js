(function(global) {

    // Validate the context we're going to put verify.js into

    if (typeof global === 'undefined') {
        throw new TypeError('`global` closure argument is undefined');
    }

    if (typeof global.verify !== 'undefined') {
        throw new TypeError('`verify` is already defined; cannot continue loading verify.js');
    }

    if (typeof global.assert !== 'undefined') {
        throw new TypeError('`assert` is already defined; cannot continue loading verify.js');
    }

    // Test result rendering function if global.verify.log isn't defined by verify.js user

    var defaultCSS = {
        "body": {
            "white-space": "pre",
            "font-family": "consolas,monospace",
            "font-size": "9pt",
            "color": "#F0F0F0",
            "background-color": "rgb(25,25,35)",
            "margin": "0",
            "padding": "4px"
        },
        ".time": {
            "color": "infobackground",
            "font-size": "8.5pt"
        },
        ".fail": {
            "color": "red"
        },
        ".pass": {
            "color": "white"
        }
    };

    document.head.appendChild((function() {
        var styleTag = document.createElement("style");
        styleTag.setAttribute("type", "text/css");
        styleTag.innerHTML = defaultCSS;
        return styleTag;
    })());

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

    // Wrapper for assert()s; catches the assertion reslts

    var verify = global.verify = function(expectation, test) {
        try {
            test();
            assert.fail("Nothing was asserted. A test must `assert()` at least once.");
        }
        catch(assertion) {
            assertion.test = test;
            (verify.log || logTest)(assertion, expectation);
        }
    };

    // Expose a list for consumers to add tests to

    verify.tests = [];

    verify.add = function(tests) {
        Array.prototype.splice.apply(verify.tests, [verify.tests.length, 0].concat(tests));
    };

    // Add a method to import test dependencies (e.g. the sources they're testing!)

    verify.require = function() {
        Array.prototype.slice.call(arguments).forEach(function(url) {
            var script = document.createElement("script");
            script.src = url;
            document.head.insertBefore(script, document.head.children[0]);
        });
    };

    // Execute all the tests

    verify.run = function() {
        if (arguments.length) {
            verify.require.apply(this, arguments);
        }

        verify.tests.forEach(function(test) {
            verify(test.verify, test.test);
        });
    };

})(this);