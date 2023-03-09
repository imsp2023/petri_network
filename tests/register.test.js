QUnit.module("Register");

QUnit.test("add do nothing when no uuid", assert => {
    Register.add();
    assert.equal(Object.keys(Register.store).length, 0, "store size");
});

QUnit.test("add component to register", assert => {
    var obj = {id:'foo'};
    Register.add('foo', obj);
    assert.equal(obj, Register.store['foo'], "component added corectly");
});


QUnit.test("find component to register", assert => {
    Register.store['bar'] = {id: 'bar'};
    var cp = Register.find('bar');
    assert.equal(cp, Register.store['bar'], "Component found");
});

QUnit.test("find returns null when not found", assert => {
    var cp = Register.find('foobar');
    assert.equal(cp, null, "Component found");
});

QUnit.test("delete component to register", assert => {

    Register.store['foo'] = {};
    Register.store['bar'] = {};
    Register.clear('foo');
    assert.equal(Object.keys(Register.store).length, 1, "store size");
});

QUnit.test("foreach iterates through store elements", assert => {
    Register.store['foo'] = {
    };
    Register.store['bar'] = {
    };
    var count = {count:0};
    
    Register.forEach((c, u)=>{u.count++}, count);
    assert.equal(count.count, 2, "count value");
});

