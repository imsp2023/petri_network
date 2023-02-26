QUnit.module("Register");

QUnit.test("add component to register", assert => {
    var obj = {
	shape: {
	    uuid: 1
	}
    }
    Register.add(obj);

    var cp = Register.find(obj.shape.uuid);
    assert.equal(cp.shape.uuid, obj.shape.uuid, "component added corectly");
});


QUnit.test("find component to register", assert => {
    var obj = {
	shape: {
	    uuid: 1
	}
    }
    Register.add(obj);

    var cp = Register.find(obj.shape.uuid);
    assert.equal(cp.shape.uuid, obj.shape.uuid, "Component found");
});

QUnit.test("delete component to register", assert => {
    var obj = {
	shape: {
	    uuid: 1
	}
    }
    Register.add(obj);

    Register.clear(obj.shape.uuid);

    var cp = Register.find(obj.shape.uuid);

    assert.equal(cp, null, "component is effectively deleted");
});
