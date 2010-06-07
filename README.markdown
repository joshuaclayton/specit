# SpecIt

## There's some RSpec in your QUnit

Let's face it: [QUnit](http://github.com/jquery/qunit) is pretty awesome, but just doesn't seem to read correctly.

I don't have the patience to write my own JS testing framework so I figured I'd piggyback off of what QUnit provides.

## Example

    describe("SpecIt", function() {
      var john, cachedItems = [];

      before(function() {
        john = {name: "John Doe", age: 26};
      });

      after(function() {
        cachedItems = [];
      });

      it("should match on inclusion", function() {
        [1, 2].should(include, 1, 2);
        ({one: 1, two: 2}).should(include, "one");
        "string".should(include, "str");
        cachedItems.push(1);
        cachedItems.should(include, 1);
      });

      it("should match by type comparison", function() {
        "string".should(beA, String);
        (function() {}).should(beA, Function);
        true.should(beA, Boolean);
        ({}).should(beAn, Object);
      });

      it("allows overriding variables", function() {
        john = {};
        john.shouldNot(include, "name");
      });

      it("should use before blocks", function() {
        john.name.should(eql, "John Doe");
        john.age.should(beLessThan, 30);
      });

      it("should run after callbacks", function() {
        cachedItems.should(beSimilarTo, []);
      });
    });

## Supported Matchers

* include (checks presence within an object)
* eql (checks equality with QUnit's equal)
* beSimilarTo (checks equality with QUnit's deepEqual)
* be (asserts true)
* beA, beAn (checks type)
* match (checks against a regular expression)
* respondTo (checks that a function exists)
* beLessThan (checks a number is less than another)
* beLessThanOrEqualTo (checks a number is less than or equal to another)
* beGreaterThan (checks a number is greater than another)
* beGreaterThanOrEqualTo (checks a number is greater than or equal to another)
* beEmpty (checks if an array, object literal, or string is empty)
* beOnThePage (checks that an element is present on a page)
* beToTheLeftOf (checks that an element is to the left of another element)
* beCompletelyToTheLeftOf (checks that an element is completely to the left of another element)

## Other supported features

* Before callbacks
* After callbacks

## What's it do?

I wrote some matchers and used QUnit's module and test methods, that's all.  The test file is a great form of documentation and demonstrates everything SpecIt can do currently.

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Commit, do not mess with version or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2010 Josh Clayton.  Check the LICENSE for details.
