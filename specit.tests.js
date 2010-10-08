describe("SpecIt", function() {
  it("should match on inclusion", function() {
    assert([1, 2]).should(include, 1);
    assert([1, 2]).should(include, 1, 2);
    assert({one: 1, two: 2}).should(include, "one");

    assert([1, 2]).shouldNot(include, [1, 2]);
    assert([1, 2]).shouldNot(include, [1, 2], 1, 2);
    assert([1, 2]).shouldNot(include, 3);
    assert([1, 2]).shouldNot(include, 3, 4);
    assert({one: 1}).shouldNot(include, "two");

    assert("string").should(include, "string");
    assert("string").should(include, "ring");
    assert("string").should(include, "tr");

    assert("string").shouldNot(include, "  string");
    assert("string").shouldNot(include, "string ");
    assert("string").shouldNot(include, "cat");
  });

  it("should match on equality", function() {
    assert("string").should(eql, "string");
    assert(1).should(eql, 1);
    assert(true).should(eql, true);

    assert("string").shouldNot(eql, "junk");
    assert([]).shouldNot(eql, []);
    assert(["tree"]).shouldNot(eql, ["tree"]);
    assert({}).shouldNot(eql, {});
    assert(true).shouldNot(eql, false);
  });

  it("should match on similarity", function() {
    assert("string").should(beSimilarTo, "string");
    assert(1).should(beSimilarTo, 1);
    assert(true).should(beSimilarTo, true);
    assert([]).should(beSimilarTo, []);
    assert(["tree"]).should(beSimilarTo, ["tree"]);
    assert({}).should(beSimilarTo, {});
    assert({a: 1}).should(beSimilarTo, {"a": 1});

    assert("string").shouldNot(beSimilarTo, "junk");
    assert(true).shouldNot(beSimilarTo, false);
    assert({a: 1}).shouldNot(beSimilarTo, {b: 1});
  });

  it("should match on truthiness", function() {
    assert("string").should(be);
    assert(true).should(be);
    assert(1).should(be);

    assert("").shouldNot(be);
    assert(false).shouldNot(be);
    assert(0).shouldNot(be);
  });

  it("should match by type comparison", function() {
    assert("string").should(beA, String);
    assert(function() {}).should(beA, Function);
    assert(true).should(beA, Boolean);
    assert({}).should(beAn, Object);
    assert([]).should(beAn, Array);
    assert(1).should(beA, Number);
    assert(/regular-expression/).should(beA, RegExp);

    assert("string").shouldNot(beAn, Object);
    assert("string").shouldNot(beA, Number);
    assert([]).shouldNot(beAn, Object);
  });

  it("should match against regular expressions", function() {
    assert("string").should(match, /string/);
    assert("202-555-1212").should(match, /\d{3}.\d{3}.\d{4}/);
    assert("string").shouldNot(match, /\\\\w{10}/);
  });

  it("should match on method presence", function() {
    var myObject = {
      attribute1: 1,
      booleanAttr: true,
      methodAttr: function() {}
    };

    assert(myObject).should(respondTo, "methodAttr");
    assert(myObject).shouldNot(respondTo, "attribute1");
    assert(myObject).shouldNot(respondTo, "booleanAttr");
    assert(myObject).shouldNot(respondTo, "junkMethod");

    var Person = function(options) {
      this.name = options.name || "";
      this.age = options.age || 13;
      this.sayHi = function() {
        return "Hello; my name is " + this.name;
      };
      return this;
    };

    var john = new Person({name: "John Doe", age: 35});
    assert(john).should(respondTo, "sayHi");
    assert(john).shouldNot(respondTo, "name");
    assert(john).shouldNot(respondTo, "age");
    assert(john).shouldNot(respondTo, "sayGoodbye");
  });

  it("should match on less than", function() {
    assert(  2).should(beLessThan, 5);
    assert( -5).should(beLessThan, 0);
    assert(  0).should(beLessThan, 0.1);
    assert(  5).shouldNot(beLessThan, 3);
    assert(0.1).shouldNot(beLessThan, 0);
    assert(0.1).shouldNot(beLessThan, 0.05);
    assert(  5).shouldNot(beLessThan, 5);

    assert("awesome").should(beLessThan, "great");
  });

  it("should match on less than or equal to", function() {
    assert(  2).should(beLessThanOrEqualTo, 5);
    assert( -5).should(beLessThanOrEqualTo, 0);
    assert(  0).should(beLessThanOrEqualTo, 0.1);
    assert(  5).should(beLessThanOrEqualTo, 5);
    assert(0.1).should(beLessThanOrEqualTo, 0.1);

    assert(  5).shouldNot(beLessThanOrEqualTo, 3);
    assert(0.1).shouldNot(beLessThanOrEqualTo, 0);
    assert(0.1).shouldNot(beLessThanOrEqualTo, 0.05);

    assert("awesome").should(beLessThanOrEqualTo, "great");
    assert("great").should(beLessThanOrEqualTo, "great");
  });

  it("should match on greater than", function() {
    assert(  2).should(beGreaterThan, 1);
    assert( -5).should(beGreaterThan, -10);
    assert(  0).should(beGreaterThan, -0.1);
    assert(  5).shouldNot(beGreaterThan, 30);
    assert(0.1).shouldNot(beGreaterThan, 0.2);
    assert(0.01).shouldNot(beGreaterThan, 0.05);
    assert(  5).shouldNot(beGreaterThan, 5);

    assert("awesome").should(beGreaterThan, "absolute");
  });

  it("should match on greater than or equal to", function() {
    assert(  2).should(beGreaterThanOrEqualTo, 1);
    assert( -5).should(beGreaterThanOrEqualTo, -10);
    assert(  0).should(beGreaterThanOrEqualTo, -0.1);
    assert(  5).should(beGreaterThanOrEqualTo, 5);
    assert(  5).shouldNot(beGreaterThanOrEqualTo, 30);
    assert(0.1).shouldNot(beGreaterThanOrEqualTo, 0.2);
    assert(0.01).shouldNot(beGreaterThanOrEqualTo, 0.05);

    assert("awesome").should(beGreaterThanOrEqualTo, "awesome");
  });

  it("should match on emptiness", function() {
    assert([]).should(beEmpty);
    assert({}).should(beEmpty);
    assert(0).should(beEmpty);
    assert(5).should(beEmpty);
    assert("").should(beEmpty);
    assert([1, 2]).shouldNot(beEmpty);
    assert({one: 1}).shouldNot(beEmpty);
    assert("one").shouldNot(beEmpty);
  });

  it("should match on elements on a page", function() {
    $(".workspace").append("<div class='great'>");
    assert($(".workspace .great")).should(beOnThePage);
    assert($(".workspace .non-existant")).shouldNot(beOnThePage);
    $(".workspace").empty();
  });
});

var john, beforeCallbackTest, afterCallbackTest;

describe("SpecIt with a before callback", function() {
  var jane = {name: "Jane"};

  before(function() {
    beforeCallbackTest = true;
    john = {name: "John Doe"};
  });

  it("should support before", function() {
    ok(beforeCallbackTest);
    equal(afterCallbackTest, undefined);
  });

  it("should run before every test", function() {
    john.name = "Wrong name";
    jane.age = 26;
  });

  it("should run before every test", function() {
    equals(john.name, "John Doe");
  });

  it("should not know attributes from another before callback", function() {
    equals(john.age, undefined);
  });

  it("should not modify attributes on a local object if untouched in before", function() {
    equals(jane.age, 26);
  });
});

// the john object will carry over, but the jane object will not
describe("SpecIt with a different before callback", function() {
  before(function() { john.age = 35; });

  it("should not run other describes' before callbacks", function() {
    john.name = "whatever";
    equals(john.age, 35);
  });

  it("should not run other describes' before callbacks", function() {
    equals(john.name, "whatever");
    equals(john.age, 35);
  });

  it("should not know of other objects in a different describe", function() {
    equals(typeof jane, "undefined");
  });
});

describe("SpecIt with an after callback", function() {
  var changedFromAfterCallback = "unchanged";

  after(function() {
    changedFromAfterCallback = "changed";
  });

  it("should not call after callback until after a test is run", function() {
    equals(changedFromAfterCallback, "unchanged");
  });

  it("should call the after callback the first test is run", function() {
    equals(changedFromAfterCallback, "changed");
    changedFromAfterCallback = "bogus";
  });

  it("should call the after callback after each test is run", function() {
    equals(changedFromAfterCallback, "changed");
  });
});

describe("SpecIt handling before and after", function() {
  before(function() { $("body").append("<div id='crazy'>"); });
  after (function() { $("#crazy").remove(); });

  it("should run before callbacks correctly", function() {
    $("#crazy").html("awesome div");
    assert($("#crazy:contains(awesome div)")).should(beOnThePage);
  });

  it("should run after callbacks correctly", function() {
    assert($("#crazy").length).should(eql, 1);
    assert($("#crazy:contains(awesome div)")).shouldNot(beOnThePage);
  });
});

describe("SpecIt should know relative positions", function() {
  it("should know if an element is to the left of another", function() {
    assert($(".left-right-correct .left")).should(beToTheLeftOf, ".left-right-correct .right");
    assert($(".left-right-correct .text-1")).should(beToTheLeftOf, ".left-right-correct .text-2");

    assert($(".left-right-correct .right")).shouldNot(beToTheLeftOf, ".left-right-correct .left");
    assert($(".left-right-broken .left")).shouldNot(beToTheLeftOf, ".left-right-broken .right");
  });

  it("should know if an element is to the right of", function() {
    assert($(".left-right-correct .right")).should(beToTheRightOf, ".left-right-correct .left");
    assert($(".left-right-correct .text-2")).shouldNot(beToTheRightOf, ".left-right-correct .text-1");

    assert($(".left-right-correct .left")).shouldNot(beToTheRightOf, ".left-right-correct .right");
    assert($(".left-right-broken .right")).shouldNot(beToTheRightOf, ".left-right-broken .left");
  });

  it("should know if an element is to the above", function() {
    assert($(".left-right-broken .left")).should(beAbove, ".left-right-broken .right");
    assert($(".left-right-correct .text-2")).shouldNot(beAbove, ".left-right-correct .text-1");

    assert($(".left-right-correct .left")).shouldNot(beAbove, ".left-right-correct .right");
    assert($(".left-right-correct .right")).shouldNot(beAbove, ".left-right-correct .left");
  });
});
