QUnit.module("Component");

QUnit.test("Throws an exception without parameters", assert => {
    assert.throws(
	function(){
	    new Component();
	},
	"missing parameter"
    );
});

QUnit.test("Throws an exception with only one parameter", assert => {
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
	    new Component("pace", {});
	},
	"wrong parameter"
    );
});

QUnit.test("Throws an exception when props is not an object", assert => {
    assert.throws(
	function(){
	    new Component("place", 111);
	},
	"wrong parameter"
    );
});

QUnit.test("Throws an exception when place instantiation failed", assert => {
    factoryFailed = true;
    assert.throws(
	function(){
	    new Component("place", {});
	},
	"instantiation failed"
    );
});

QUnit.test("Throws an exception when transition instantiation failed", assert => {
    factoryFailed = true;
    assert.throws(
	function(){
	    new Component("transition", {});
	},
	"instantiation failed"
    );
});

QUnit.test("Throws an exception when edge instantiation failed", assert => {
    factoryFailed = true;
    assert.throws(
	function(){
	    new Component("edge", {});
	},
	"instantiation failed"
    );
});

QUnit.test("instantiation of a transition returns an object with type and comp attributes", assert => {
    factoryFailed = false;
    var obj = new Component('transition', {});
    assert.equal(obj.type, 'transition', "type of component must be a 'transition'");
    assert.equal(typeof obj.comp, 'object', "comp attribute must be an object");
});

QUnit.test("instantiation of a place returns an object with type and comp attributes", assert => {
    factoryFailed = false;
    var obj = new Component('place', {});
    assert.equal(obj.type, 'place', "type of component must be a 'place'");
    assert.equal(typeof obj.comp, 'object', "comp attribute must be an object");
});

QUnit.test("instantiation of a edge returns an object with type and comp attributes", assert => {
    factoryFailed = false;
    var obj = new Component('edge', {});
    assert.equal(obj.type, 'edge', "type of component must be a 'edge'");
    assert.equal(typeof obj.comp, 'object', "comp attribute must be an object");
});


QUnit.test("Instantiation of a place must register it", assert => {
    n_tab = 0;
    var cp = new Component("place", {});
    assert.equal(n_tab, 1, "component is correctly added to register");
});

QUnit.test("Instantiation of a transition must register it", assert => {
    n_tab = 0;
    var cp = new Component("transition", {});
    assert.equal(n_tab, 1, "register count");
});

QUnit.test("Instantiation of an edge must register it", assert => {
    n_tab = 0;
    var cp = new Component("edge", {});
    assert.equal(n_tab, 1, "register count");
});

// QUnit.test("define a mouseup event on svg to delete edge line", assert => {
//     var cp = new Component("edge", {});
//     assert.equal(events['mouseup'], 1, "event count");
// });


QUnit.test("use the default position when not provided", assert => {
    layoutAjust = 0;
    var props = {};
    var cp = new Component("place", props);
    assert.equal(layoutAjust, 0, "layoutFreepos count");
    assert.equal(props.x, 0, "default value");
    assert.equal(props.y, 0, "default value");
});

QUnit.test("reajust the default position when provided", assert => {
    layoutAjust = 0;
    var cp = new Component("place", {x:0,y:1});
    assert.equal(layoutAjust, 1, "layoutAjust count");
});

QUnit.test("addConnector from transition first removes panel", assert => {
    removePanel = 0;
    var cp = new Component("transition", {});
    cp.addConnector('place');
    assert.equal(removePanel, 1, "removepanel count");
});


QUnit.test("do nothing when we try to add transition from transition", assert => {
    removePanel = 0;
    cp = new Component("transition", {});

    n_tab = 0;
    cp.addConnector('transition');
    assert.equal(removePanel, 1, "removepanel count");
    /* no component is added to register */
    assert.equal(n_tab, 0, "register count");
});

QUnit.test("do nothing when we try to add place from place", assert => {
    removePanel = 0;
    var cp = new Component("place", {});

    n_tab = 0;
    cp.addConnector('place');
    assert.equal(removePanel, 1, "removepanel count");
    /* no component is added to register */
    assert.equal(n_tab, 0, "register count");
});

QUnit.test("do nothing when we try to add an edge from edge", assert => {
    removePanel = 0;
    var cp = new Component("edge", {});

    n_tab = 0;
    cp.addConnector('edge');
    assert.equal(removePanel, 1, "removepanel count");
    /* no component is added to register */
    assert.equal(n_tab, 0, "register count");
});

QUnit.test("addConnector from place first removes panel", assert => {
    removePanel = 0;
    var cp = new Component("place", {});
    cp.addConnector('transition');
    assert.equal(removePanel, 1, "removepanel count");
});


QUnit.test("addConnector looks for a new position for the transition to be added", assert => {
    layoutClosest = 0;
    n_tab = 0;
    var cp = new Component("place", {});
    cp.addConnector('transition');
    assert.equal(n_tab, 3, "register count");
    assert.equal(layoutClosest, 1, "layoutClosest count");
});

QUnit.test("addConnector looks for a new position for the place to be added", assert => {
    n_tab = 0;
    layoutClosest = 0;
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('place');
    assert.equal(n_tab, 3, "register count");
    assert.equal(layoutClosest, 1, "layoutClosest count");
});

QUnit.test("addConnector calls mark method at least twice to add transition", assert => {
    layoutMark = 0;
    layout.init(10, 10, 5, 5);
    var cp = new Component("place", {x:0,y:0});
    cp.addConnector('transition');
    assert.equal(layoutMark, 4, "layoutMark count");
});

/******* add edge ******************/
QUnit.test("addConnector sets global variables (line, src)", assert => {
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('edge');
    assert.ok(Component.line, "line variable value");
    assert.ok(Component.src, "src variable value");
});

QUnit.test("edgeComplete do nothing when no line", assert => {
    lineRemove = 0;
    Component.line = null;
    Component.src = null;
    var cp = new Component("transition", {x:0,y:0});
    cp.edgeCompleted();
    assert.equal(lineRemove, 0, "remove from DOM count");
});

QUnit.test("edgeCompleted do nothing when target is not correct", assert => {
    n_tab = 0;
    tab[0] = null;
    lineRemove = 0;
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('edge');
    n_tab = 0;
    tab[0] = null;
    cp.edgeCompleted(111);
    assert.equal(lineRemove, 0, "remove from DOM count");
});

QUnit.test("edgeCompleted deletes current line", assert => {
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('edge');

    cp.edgeCompleted(1);
    assert.equal(lineRemove, 1, "remove from DOM count");
});

QUnit.test("edgeCompleted do not create the edge when target and src is the same type", assert => {
    lineRemove = 0;
    n_tab = 0;
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('edge');
    n_tab = 0;
    cp.edgeCompleted(1);
    assert.equal(lineRemove, 1, "remove from DOM count");
    assert.equal(n_tab, 1, "register count");
});

QUnit.test("edgeCompleted registers an edge component", assert => {
    lineRemove = 0;
    layoutMark = 0;
    n_tab = 0
    var cp = new Component("transition", {x:0,y:0});
    
    cp.addConnector('edge');
    n_tab=1;
    tab[1] = {type: 'place', comp: {shape: {uuid: 1122}}};
    
    cp.edgeCompleted(1);
    assert.equal(lineRemove, 1, "remove from DOM count");
    assert.equal(n_tab, 3, "register count");
    assert.equal(layoutMark, 4, "layoutMark count");
});

/********************** delete action ***********************/
/* TODO: To be done */
