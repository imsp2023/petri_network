QUnit.module("Factory");


QUnit.test("getshape returns null  when no parameter", assert => {
    var obj = Factory.getShape();
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns null  with only one parameter", assert => {
    var obj = Factory.getShape('');
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns null when the type isn't correct", assert =>{
    var obj = Factory.getShape('', {});
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns null when second parameter is not an object", assert => {
    var obj = Factory.getShape('place', 111);
    assert.equal(obj, null, "getshape returned value");
});



QUnit.test("getshape returns null when place instantiation failed", assert =>{
    factoryFailed = true;
    var obj = Factory.getShape('place', {});
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns null when transition instantiation failed", assert =>{
    var obj = Factory.getShape('transition', {});
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns null when edge instantiation failed", assert =>{
    var obj = Factory.getShape('edge', {});
    assert.equal(obj, null, "getshape returned value");
});

QUnit.test("getshape returns an object when edge instantiation is successful", assert =>{
    var obj = Factory.getShape('edge', {});
    assert.equal(typeof obj, 'object', "getshape returned value");
});

QUnit.test("getshape returns an object when edge instantiation is successful", assert =>{
    var obj = Factory.getShape('edge', {});
    assert.equal(typeof obj, 'object', "getshape returned value");
});

QUnit.test("getshape returns an object when edge instantiation is successful", assert =>{
    var obj = Factory.getShape('edge', {});
    assert.equal(typeof obj, 'object', "getshape returned value");
});
