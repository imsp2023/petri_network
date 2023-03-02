QUnit.module("Factory");


QUnit.test("Throws an exception when there are less than two parameters", assert => {

    assert.throws(
	function(){
	    Factory.getShape("blabla");
	},
	"missing parameter"
    );

    assert.throws(
	function(){
	    Factory.getShape();
	},
	"missing parameter"
    );
});

QUnit.test("Throws an exception when the type isn't correct", assert =>{
    assert.throws(
	function(){
	    Factory.getShape("blabla", {});
	},
	"type isn't correct"
    );
});

QUnit.test("Creation of a place", assert => {
    var props = {
	type: 'start'
    };
    var shape = Factory.getShape("place", props);

    assert.ok(shape instanceof Place, "the object must be an instance of Place");
    assert.equal(shape.type, props.type, "the type must be '" + props.type + "'");
});

QUnit.test("Creation of an edge", assert => {
    var props = {
	direction: 'p2t',
	src: 1
    };
    n_tab = 0;
    tab[0] = {
	uuid: 1,
	shape: {
	    uuid: 1,
	    form: {
		x: 10,
		y: 30,
		c_points: [
		    {
			x: 10,
			y: 30
		    },
		]
	    }
	}
    };

    var shape = Factory.getShape("edge", props);

    assert.ok(shape instanceof Edge, "the object must be an instance of Edge");
    assert.equal(shape.type, props.type, "the type must be '" + props.type + "'");
});

QUnit.test("Creation of a transition", assert => {
    var props = {
	name: 'p2t',
	type: 'manual'
    };
    n_tab = 0;
    tab[0] = {
	uuid: 1,
	shape: {
	    uuid: 1,
	    form: {
		x: 10,
		y: 30,
		c_points: [
		    {
			x: 10,
			y: 30
		    },
		]
	    }
	}
    };

    var shape = Factory.getShape("transition", props);

    assert.ok(shape instanceof Transition, "the object must be an instance of Transition");
    assert.equal(shape.type, props.type, "the type must be '" + props.type + "'");
    assert.equal(shape.name, props.name, "the name of the transition must be '" +  props.name + "'");
});
