(function() {
  function objectToSpecIt(expectation, args) {
    var args = $.makeArray(args),
        matcherAndArgs = [args.shift()];
    $.each(args, function(i, item) { matcherAndArgs.push(item); });
    return SpecIt.expectations(this)[expectation].apply(this, matcherAndArgs);
  }

  var SpecIt = {
    currentExpectation: "should",
    assert: function(value) {
      return {
        should:    function() { return objectToSpecIt.call(value, "should", arguments); },
        shouldNot: function() { return objectToSpecIt.call(value, "shouldNot", arguments); }
      };
    },
    describe: function(description, body) {
      this.currentTests = [];
      this.currentBefore = function() {};
      this.currentAfter  = function() {};
      body();
      module(description, {setup: this.currentBefore, teardown: this.currentAfter});
      $.each(this.currentTests, function(i, currentTest) { currentTest(); });
    },
    it: function(description, body) {
      currentTests.push(function() { test(description, body); });
    },
    asyncIt: function(description, body) {
      currentTests.push(function() { asyncTest(description, body); });
    },
    before: function(callback) { this.currentBefore = callback; },
    after:  function(callback) { this.currentAfter  = callback; },
    expectations: function(current) {
      var expect = function(expectation, args) {
        var args = $.makeArray(args);
        SpecIt.currentExpectation = expectation;
        args.shift().apply(current, args);
      };
      return {
        should:    function() { return expect("should",    arguments); },
        shouldNot: function() { return expect("shouldNot", arguments); }
      }
    }
  };

  var Matcher = function(expectation, assertion, options) {
    var expected = options.expected.value,
        actual   = options.actual.value,
        assert   = options.assert,
        messageOptions = {},
        message = SpecIt.expectationMessage(expectation,
                                            expected,
                                            options.actual.messageValue || actual,
                                            messageOptions);

    if(SpecIt.currentExpectation === "shouldNot") {
      switch(assertion) {
        case "equal":     assertion = "notEqual";     break;
        case "equals":    assertion = "notEqual";     break;
        case "ok":        assertion = "ok";           break;
        case "deepEqual": assertion = "notDeepEqual"; break;
      }
      if(assertion === "ok") { assert = !assert; }
    }

    if(assertion === "ok") {
      window[assertion](assert, message);
    } else {
      window[assertion](actual, expected, message);
    }
  };

  $.extend(SpecIt, {
    expectationMessage: function(matcher, expected, actual) {
      var matcherMessages = {
        include:                "Expected {expected} {not} to include {actual}",
        eql:                    "Expected {expected} {not} to equal {actual}",
        beSimilarTo:            "Expected {expected} {not} to be the same as {actual}",
        be:                     "Expected {expected} {not} to be true",
        beA:                    "Expected {expected} {not} to be a {actual}",
        beAn:                   "Expected {expected} {not} to be an {actual}",
        match:                  "Expected {expected} {not} to match {actual}",
        respondTo:              "Expected {expected} {not} to be a method of {actual}",
        beLessThan:             "Expected {expected} {not} to be less than  {actual}",
        beLessThanOrEqualTo:    "Expected {expected} {not} to be less than or equal to {actual}",
        beGreaterThan:          "Expected {expected} {not} to be greater than {actual}",
        beGreaterThanOrEqualTo: "Expected {expected} {not} to be greater than or equal to {actual}",
        beOnThePage:            "Expected {expected} {not} to be on the page {actual}",
        beEmpty:                "Expected {expected} {not} to be empty {actual}",
        beToTheLeftOf:          "Expected {expected} {not} to be to the left of {actual}",
        beToTheRightOf:         "Expected {expected} {not} to be to the right of {actual}",
        beAbove:                "Expected {expected} {not} to be above {actual}"
      }, message, options = arguments[3];

      message = matcherMessages[matcher];

      message = message.replace("{expected}", expected).replace("{actual}", JSON.stringify(actual));

      if(SpecIt.currentExpectation === "should") {
        message = message.replace("{not} ", "");
      } else {
        message = message.replace("{not}", "not");
      }

      return message;
    },
    matchers: {
      include: function() {
        var args = $.makeArray(arguments), expectation = true, actual = this;
        $.each(args, function(i, item) {
          if(actual.constructor == Object && actual.length == undefined) {
            expectation = false;
            if(item in actual) { expectation = true; }
          } else {
            if(actual.indexOf(item) < 0) { expectation = false; }
          }
        });

        Matcher("include", "ok",
                {assert:   expectation,
                 expected: {value: args,   parse: true},
                 actual:   {value: actual, parse: true}});
      },
      eql: function() {
        Matcher("eql", "equal",
                {expected: {value: arguments[0], parse: true},
                 actual:   {value: this,         parse: true}});
      },
      beSimilarTo: function() {
        Matcher("beSimilarTo", "deepEqual",
                {expected: {value: arguments[0], parse: true},
                 actual:   {value: this,         parse: true}});
      },
      be: function() {
        Matcher("be", "ok",
                {assert:   JSON.parse(JSON.stringify(this)),
                 expected: {value: true, parse: true},
                 actual:   {value: this, parse: true}});
      },
      beA: function() {
        Matcher("beA", "equals",
                {expected: {value: arguments[0].name.toString(), parse: true},
                 actual:   {value: this.constructor.name,        parse: true, messageValue: this}});
      },
      beAn: function() {
        Matcher("beAn", "equals",
                {expected: {value: arguments[0].name.toString(), parse: true},
                 actual:   {value: this.constructor.name,        parse: true, messageValue: this}});
      },
      match: function() {
        Matcher("match", "ok",
                {assert:   arguments[0].test(this),
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this,         parse: true}});
      },
      respondTo: function() {
        Matcher("respondTo", "ok",
                {assert: typeof this[arguments[0]] === "function",
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beLessThan: function() {
        Matcher("beLessThan", "ok",
                {assert: this < arguments[0],
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beLessThanOrEqualTo: function() {
        Matcher("beLessThanOrEqualTo", "ok",
                {assert: this <= arguments[0],
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beGreaterThan: function() {
        Matcher("beGreaterThan", "ok",
                {assert: this > arguments[0],
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beGreaterThanOrEqualTo: function() {
        Matcher("beGreaterThanOrEqualTo", "ok",
                {assert: this >= arguments[0],
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beOnThePage: function() {
        Matcher("beOnThePage", "ok",
                {assert: $(this).length > 0,
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: $(this).selector, parse: true}});
      },
      beEmpty: function() {
        var empty = true;
        if (this.constructor == Object && this.length == undefined) {
          for(var key in this) { empty = false; }
        } else {
          if(this.length > 0)  { empty = false; }
        }

        Matcher("beEmpty", "ok",
                {assert: empty,
                 expected: {value: arguments[0], parse: true},
                 actual:   {value: this, parse: true}});
      },
      beToTheLeftOf: function() {
        Matcher("beToTheLeftOf", "ok",
                {assert: $(this).offset().left < $(arguments[0]).offset().left,
                 expected: {value: $(arguments[0]).selector, parse: true},
                 actual:   {value: $(this).selector, parse: true}});
      },
      beToTheRightOf: function() {
        Matcher("beToTheRightOf", "ok",
                {assert: ($(this).offset().left > ($(arguments[0]).offset().left + $(arguments[0]).width())),
                 expected: {value: $(arguments[0]).selector, parse: true},
                 actual:   {value: $(this).selector, parse: true}});
      },
      beAbove: function() {
        Matcher("beAbove", "ok",
                {assert: $(this).offset().top < $(arguments[0]).offset().top,
                 expected: {value: $(arguments[0]).selector, parse: true},
                 actual:   {value: $(this).selector, parse: true}});
      }
    }
  });

  for(var matcher in SpecIt.matchers) {
    window[matcher] = SpecIt.matchers[matcher];
  }

  window.describe = SpecIt.describe;
  window.it       = SpecIt.it;
  window.asyncIt  = SpecIt.asyncIt;
  window.before   = SpecIt.before;
  window.after    = SpecIt.after;
  window.assert   = SpecIt.assert;
})();
