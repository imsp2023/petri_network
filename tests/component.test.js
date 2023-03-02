QUnit.module("Component");

QUnit.test("Throws an exception when there are less than two parameters provided", assert => {
    assert.throws(
	function(){
	    new Component();
	},
	"missing parameter"
    );
    assert.throws(
	function(){
	    new Component("blabla");
	},
	"missing parameter"
    );
});

QUnit.test("Throws an exception when the type isn't correct", assert => {
    assert.throws(
	function(){
	    new Component("pace");
	},
	"type isn't correct"
    );
});

QUnit.test("Check that the component is registered when it's created", assert => {
    n_tab = 0;
    var cp = new Component("place", {});
    n_tab = 0;
    var f_cp = Register.find(cp.comp.shape.uuid);

    assert.equal(cp.comp.shape.uuid, f_cp.comp.shape.uuid, "component is correctly added to register");
});

QUnit.test("Creation of a place component", assert => {
    var cp = new Component("place", {});

    assert.equal(cp.type, 'place', "type of component must be a 'place'");
    assert.ok(cp.comp instanceof Place, "object must be an instance of Place")
});

QUnit.test("Creation of a transition component", assert => {
    var cp = new Component("transition", {});

    assert.equal(cp.type, 'transition', "type of component must be a 'place'");
    assert.ok(cp.comp instanceof Transition, "object must be an instance of Place")
});

QUnit.test("Creation of an edge component", assert => {
    n_tab = 0;
    tab[0] = {
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

    var cp = new Component("edge", {
	direction: 'p2t',
	src: 1
    });

    assert.equal(cp.type, 'edge', "type of component must be a 'place'");
    assert.ok(cp.comp instanceof Edge, "object must be an instance of Place")
});

/*
QUnit.test("Adding an edge connector to a component", assert => {
    var cp = new Component("place", {type: 'start'});

    cp.addConnector('edge');

    assert.equal();
});
*/

QUnit.test("Throws an exception when two components with the same type are connected", assert => {
    var cp = new Component("place", {type: 'start'});

    assert.throws(
	function(){
	    cp.addConnector('place');
	},
	"link between two components with same type is forbidden"
    );

    cp = new Component("transition", {direction: "p2t", end: 1});

    assert.throws(
	function(){
	    cp.addConnector('transition');
	},
	"link between two components with same type is forbidden"
    );
});
