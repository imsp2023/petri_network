QUnit.module("Register");

QUnit.test("add component to register", assert => {
    var obj = {
	comp: {
	    shape: {
		uuid: 1
	    }
	}
    }
    Register.add(obj);

    var cp = Register.find(obj.comp.shape.uuid);
    assert.equal(cp.comp.shape.uuid, obj.comp.shape.uuid, "component added corectly");
});


QUnit.test("find component to register", assert => {
    var obj = {
	comp: {
	    shape: {
		uuid: 1
	    }
	}
    }
    Register.add(obj);

    var cp = Register.find(obj.comp.shape.uuid);
    assert.equal(cp.comp.shape.uuid, obj.comp.shape.uuid, "Component found");
});

QUnit.test("delete component to register", assert => {
    var obj = {
	comp: {
	    shape: {
		uuid: 1
	    }
	}
    }
    Register.add(obj);

    Register.clear(obj.comp.shape.uuid);

    var cp = Register.find(obj.comp.shape.uuid);

    assert.equal(cp, null, "component is effectively deleted");
});

QUnit.test("check that all edges coming from or arriving to a component  are returned", assert => {
    var src = {
	comp: {
	    shape: {
		uuid: 1
	    }
	}
    }

    var dest = {
	comp: {
	    shape: {
		uuid: 2
	    }
	}
    }

    var edge1 = {
	type: 'edge',
	comp: {
	    shape: {
		line: {
		    uuid: 3
		},
		source: {
		    ref: 1
		},
		destination: {
		    ref: 2
		}
	    }
	}
    }

    var edge2 = {
	type: 'edge',
	comp: {
	    shape: {
		line: {
		    uuid: 4
		},
		source: {
		    ref: 1
		},
		destination: {
		    ref: 2
		}
	    }
	}
    }

    var cps = [];
    cps.push(edge1);
    cps.push(edge2);

    Register.add(src);
    Register.add(dest);
    Register.add(edge1);
    Register.add(edge2);

    var edges = Register.findAllEdges(src);

    console.log(edges);

    assert.deepEqual(edges, cps, "all edges are returned");
});
