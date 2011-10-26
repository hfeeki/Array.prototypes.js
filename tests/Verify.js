(function(global) {

    if (typeof global === 'undefined') {
        throw new TypeError('`global` closure argument is undefined');
    }

    // Gi'me some ECMAScript 5 goodness

    function isArray(thing) {
        return Object.prototype.toString.call(thing) === '[object Array]';
    }

    // Test result rendering function if global.verify.log isn't defined by verify.js user

    function log(expectation, assertion) {
        var result = (assertion.passes) ? 'pass' : 'fail';

        global.document.body.innerHTML +=
            '<assertion class="' + result + '">' +
            '   <timestamp>' + new Date().getTime() + '</timestamp>' +
            '   <outcome>' + result + '</outcome>' +
            '   <expectation>' + expectation + '</expectation>' +
            '   <data>' + JSON.stringify(assertion, null, 4) + '</data>' +
            '</assertion>'
        ;
    }

    // Called within global.verify() by verify.js user; creates test functions for the context

    function assert(source) {
        return {
            is: function(target) {
                throw {
                    passes: source === target,
                    source: source,
                    target: target,
                    assert: 'is'
                };
            },
            equalTo: function(target) {
                throw {
                    passes: source == target,
                    source: source,
                    target: target,
                    assert: 'equalTo'
                };
            },
            identicalTo: function(target) {
                function orderObjects(obj) {
                    if (typeof obj !== 'object' || obj === null) {
                        return obj;
                    }

                    var orderedObject = [];

                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            orderedObject.push({
                                key: key,
                                value: orderObjects(obj[key])
                            });
                        }
                    }

                    return orderedObject.sort();
                }

                throw {
                    passes: JSON.stringify(orderObjects(source)) ===
                            JSON.stringify(orderObjects(target)),
                    source: source,
                    target: target,
                    assert: 'identicalTo'
                };
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
                throw {
                    passes: source < target,
                    source: source,
                    target: target,
                    assert: 'lessThan'
                };
            },
            defined: function() {
                throw {
                    passes: typeof source !== 'undefined',
                    source: source,
                    assert: 'defined'
                };
            },
            instanceOf: function(target) {
                throw {
                    passes: source instanceof target,
                    source: source,
                    target: target,
                    assert: 'instanceOf'
                };
            },
            "in": function(target) {
                throw {
                    passes: source in target,
                    source: source,
                    target: target,
                    assert: 'in'
                };
            },
            throws: function(target) {
                throw {
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
                };
            },
            isArray: function() {
                throw {
                    passes: isArray(source),
                    source: source,
                    assert: 'isArray'
                };
            },
            isObject: function() {
                throw {
                    passes: typeof source === 'object',
                    source: source,
                    assert: 'isObject'
                };
            },
            isNumber: function() {
                throw {
                    passes: typeof source === 'number',
                    source: source,
                    assert: 'isNumber'
                };
            },
            isString: function() {
                throw {
                    passes: typeof source === 'string',
                    source: source,
                    assert: 'isString'
                };
            },
            isBoolean: function() {
                throw {
                    passes: typeof source === 'boolean',
                    source: source,
                    assert: 'isBoolean'
                };
            },
            isFunction: function() {
                throw {
                    passes: typeof source === 'function',
                    source: source,
                    assert: 'isFunction'
                };
            },
            pass: function(message) {
                throw {
                    passes: true,
                    message: message,
                    assert: 'pass'
                };
            },
            fail: function(message) {
                throw {
                    passes: false,
                    message: message,
                    assert: 'fail'
                };
            }
        };
    }

    // The library we're exporting

    if (typeof global.Verify !== 'undefined') {
        throw new TypeError('`Verify` is already defined; cannot continue loading Verify.js');
    }

    var queuedTests = [],
        requiresQueue = [];

    global.Verify = {

        // Invoke a test, catch result containing metadata about test, and log out result

        test: function(expectation, test, moduleName) {

            // TODO validate args

            try {
                test(assert);
                assert().pass();
            }
            catch(error) {
                var assertion = error;

                if (error instanceof Error) {
                    // There's an error in the test code

                    assertion = {};
                    assertion[error.name] = error.message;

                    for (var key in error) {
                        if (error.hasOwnProperty(key)) {
                            assertion[key] = error[key];
                        }
                    }
                }

                (global.Verify.log || log)(expectation, assertion);
            }
        },

        // Add a list of tests into the queue

        push: function(/* string */ moduleName, /* Array */ tests) {

            if (
                arguments.length !== 2 ||
                typeof moduleName !== 'string' ||
                !isArray(tests)
            ) {
                throw new TypeError(
                    "`Verify.push()` takes a test module name as `arguments[0]` " +
                    "and an array of tests as as `arguments[1]`"
                );
            }

            // Add moduleName data to tests

            for (var i = 0, l = tests.length; i < l; i++) {
                tests[i].moduleName = moduleName;
            }

            // Add the tests to the queue

            Array.prototype.splice.apply(queuedTests, [queuedTests.length, 0].concat(tests));
        },

        // Import test dependencies (e.g. the sources they're testing!), a URL or Array of URLs

        require: function(urls) {
            // TODO better arg validation/parsing

            if (!isArray(urls)) {
                urls = [urls];
            }

            function onload() {
                // `this` is HTMLScriptElement
                requiresQueue = requiresQueue.slice(requiresQueue.indexOf(this.src), 1);
            }

            function onerror() {
                // `this` is HTMLScriptElement
                throw new Error('Could not load required script ' + this.src);
            }

            urls.forEach(function(url) {
                requiresQueue.push(url);

                var script = global.document.createElement("script");
                script.onload = onload;
                script.onerror = onerror;
                script.src = url;
                global.document.head.appendChild(script);
            });
        },

        // Execute all the tests, emptying queuedTests

        run: function(requires) {

            if (typeof requires !== 'undefined' && !isArray(requires)) {
                throw new TypeError(
                    '`Verify.run()` takes no arguments and executes all hitherto `Verify.push()`ed tests, ' +
                    'or an `Array` of files to `Veryify.require()` before executing tests`'
                );
            }

            // Load all requirements and execute run() when it's done

            if (requires) {
                this.require(requires);
            }

            // Poll instead of using callbacks--easier

            var poll = global.setInterval(function() {
                if (requiresQueue.length > 0) {
                    return;
                }

                global.clearInterval(poll);

                queuedTests.forEach(function(test) {
                    global.Verify.test(test.verify, test.test);
                });
            }, 15);
        }

    };

})(this);