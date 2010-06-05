describe("SpecIt", function() {
  it("should match on inclusion", function() {
    [1, 2].should(include, 1);
    [1, 2].should(include, 1, 2);
    ({one: 1, two: 2}).should(include, "one");

    [1, 2].shouldNot(include, [1, 2]);
    [1, 2].shouldNot(include, [1, 2], 1, 2);
    [1, 2].shouldNot(include, 3);
    [1, 2].shouldNot(include, 3, 4);
    ({one: 1}).shouldNot(include, "two");

    "string".should(include, "string");
    "string".should(include, "ring");
    "string".should(include, "tr");

    "string".shouldNot(include, "  string");
    "string".shouldNot(include, "string ");
    "string".shouldNot(include, "cat");
  });

  it("should match on equality", function() {
    "string".should(eql, "string");
    (1).should(eql, 1);
    true.should(eql, true);

    "string".shouldNot(eql, "junk");
    [].shouldNot(eql, []);
    ["tree"].shouldNot(eql, ["tree"]);
    ({}).shouldNot(eql, {});
    true.shouldNot(eql, false);
  });

  it("should match on similarity", function() {
    "string".should(beSimilarTo, "string");
    (1).should(beSimilarTo, 1);
    true.should(beSimilarTo, true);
    [].should(beSimilarTo, []);
    ["tree"].should(beSimilarTo, ["tree"]);
    ({}).should(beSimilarTo, {});
    ({a: 1}).should(beSimilarTo, {"a": 1});

    "string".shouldNot(beSimilarTo, "junk");
    true.shouldNot(beSimilarTo, false);
    ({a: 1}).shouldNot(beSimilarTo, {b: 1});
  });

  it("should match on truthiness", function() {
    "string".should(be);
    true.should(be);
    (1).should(be);

    "".shouldNot(be);
    false.shouldNot(be);
    (0).shouldNot(be);
  });

  it("should match by type comparison", function() {
    "string".should(beA, String);
    (function() {}).should(beA, Function);
    true.should(beA, Boolean);
    ({}).should(beAn, Object);
    [].should(beAn, Array);
    (1).should(beA, Number);
    /regular-expression/.should(beA, RegExp);

    "string".shouldNot(beAn, Object);
    "string".shouldNot(beA, Number);
    [].shouldNot(beAn, Object);
  });

  it("should match against regular expressions", function() {
    "string".should(match, /string/);
    "202-555-1212".should(match, /\d{3}.\d{3}.\d{4}/);
    "string".shouldNot(match, /\w{10}/);
  });
});
