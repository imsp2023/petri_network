QUnit.module("Lasso");

QUnit.test("basic shape of a lasso is a rectangle", assert =>{
    var l = new Lasso();

    assert.equal(l.shape.type, "rectangle", "lasso shape");
    assert.equal(l.shape.width, 10, "lasso width");
    assert.equal(l.shape.height, 10, "lasso height");
    assert.equal(l.shape["stroke"], 'blue', "border color");
    assert.equal(l.shape["stroke-width"], '2px', "border size");
    assert.equal(l.shape["fill-opacity"], 0, "lasso opacity");
    
    assert.equal(l.shape.x, 0, "x value");
    assert.equal(l.shape.y, 0, "y value");
});

QUnit.test("lasso dim can be defined by user", assert =>{
    var l = new Lasso({width: 100, height: 100});

  assert.equal(l.shape.width, 100, "lasso width");
  assert.equal(l.shape.height, 100, "lasso height");

});



