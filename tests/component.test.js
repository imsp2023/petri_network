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

QUnit.test("mark transition position on layout", assert => {
    layoutMark = 0;
    var cp = new Component("transition", {x:0,y:0});
    assert.equal(layoutMark, 1, "mark count");
});

QUnit.test("mark place position on layout", assert => {
    layoutMark = 0;
    var cp = new Component("place", {x:0,y:0});
    assert.equal(layoutMark, 1, "Mark count");
});

QUnit.test("do not mark edge on layout", assert => {
    layoutMark = 0;
    var cp = new Component("edge", {});
    assert.equal(layoutMark, 0, "Mark count");
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

QUnit.test("addConnector calls mark method five times to add transition", assert => {

    layout.init(10, 10, 5, 5);
    var cp = new Component("place", {x:0,y:0});
    layoutMark = 0;
    cp.addConnector('transition');

    /* once for the compenents creation and four times by 
       markEdge: closestposition stub always returns (2, 2)
    */
    assert.equal(layoutMark, 5, "layoutMark count");
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

QUnit.test("edgeCompleted deletes current line", assert => {
    var cp = new Component("transition", {x:0,y:0});
    lineRemove = 0;
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
    assert.equal(n_tab, 0, "register count");
});

QUnit.test("edgeCompleted registers an edge component", assert => {
    lineRemove = 0;
    layoutMark = 0;
    n_tab = 0

    layout.init(10, 10, 40, 40);
    var cp = new Component("transition", {x:0,y:0});
    cp.addConnector('edge');

    var cp = new Component("place", {x:20,y:20});
    layoutMark = 0;
    cp.edgeCompleted();
    assert.equal(lineRemove, 1, "remove from DOM count");
    assert.equal(n_tab, 3, "register count");
    assert.equal(layoutMark, 4, "layoutMark count");
});

/******************* component moving ***********************/
QUnit.test("onMouseDown set state attribute", assert => {
    var t = new Component('transition', {type:'dummy'});
    t.onMouseDown();
    assert.equal(Component.state, 'moving', 'state value');
});

QUnit.test("onMouseDown stores transition position", assert => {
    var t = new Component('transition', {type:'dummy'});
    t.onMouseDown();
    assert.equal(Component.x, t.comp.shape.shape.x, "x value");
    assert.equal(Component.y, t.comp.shape.shape.y, "y value");
});

QUnit.test("onMouseUp fix transition position", assert => {
    var t = new Component('transition', {type:'dummy'});

    layoutAjust = 0;
    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(layoutAjust, 1, "ajust count");
});

QUnit.test("onMouseUp unmarks only old transition position  when no link", assert => {
    var t = new Component('transition', {type:'dummy'});
    layoutUMark = 0;
    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(layoutUMark, 1, "umark count");
});

QUnit.test("onMouseUp marks transition position  when no link", assert => {
    var t = new Component('transition', {type:'dummy'});
    layoutMark = 0;
    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(layoutMark, 1, "mark count");
    
});

QUnit.test("onMouseUp looks for component neighbors", assert => {
    var t = new Component('transition', {type:'dummy'});
    registerForEach = 0;
    registerUserData = [];
    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(registerForEach, 1, "foreach count");
});

QUnit.test("onMouseUp unmarks old edges  when neighbors", assert => {
    var t = new Component('transition', {type:'dummy'});
    layout.init(10, 10, 40, 40);
    registerUserData = [{comp:{shape: {redraw :()=>{},line:{}}}},
			{comp:{shape: {redraw :()=>{},line:{}}}}];
    tab = [{comp:{shape: {shape:{x: 0, y: 0}}}},
	   {comp:{shape: {shape:{x: 0, y: 0}}}}];
    n_tab = 0;
    layoutUMark = 0;
    
    Component.x = 20;
    Component.y = 20;

    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(layoutUMark, 8, "umark count");
});

QUnit.test("onMouseUp marks edges  when neighbors", assert => {
    var t = new Component('transition', {type:'dummy'});
    layout.init(10, 10, 40, 40);
    layoutMark = 0;
        
    Component.x = 0;
    Component.y = 0;
    
    registerUserData = [{comp:{shape: {redraw :()=>{},line:{}}}},
			{comp:{shape: {redraw :()=>{},line:{}}}}];
    tab = [{comp:{shape: {shape:{x: 0, y: 0}}}},
	   {comp:{shape: {shape:{x: 0, y: 0}}}}];
    n_tab = 0;
    layoutUMark = 0;
    Component.state  = 'moving';
    
    t.comp.shape.shape.x = 30;
    t.comp.shape.shape.y = 30;
    
    t.onMouseUp();
    assert.equal(layoutMark, 12, "mark count");
    
});


QUnit.test("onMouseUp clear state", assert => {
    var t = new Component('transition', {type:'dummy'});
    layoutMark = 0;
    registerUserData = [];
    Component.state  = 'moving';
    t.onMouseUp();
    assert.equal(Component.state, null, "component state");
    
});

/********************** delete action ***********************/
/* TODO: To be done */
QUnit.test("delete only the component when no neighbor", assert => {
    var t = new Component('transition', {type:'automatic',name: 'foo'});

    registerForEach = 0;
    registerClear = 0;
    removeFromDOM = 0;
    registerUserData= [];
    layoutUMark = 0;
    
    t.addConnector('deletion');
    
    assert.equal(registerForEach, 1, "foreach count");

    assert.equal(registerClear, 1, "clear count");
    assert.equal(layoutUMark, 1, "umark count");
    
});

QUnit.test("delete component and its edges when neighbors", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('transition', {type:'automatic',name: 'foo', x:0, y:0});
    var p = new Component('place', {x:20, y:20});
    var e = new Edge('edge', {src: t.comp.shape.uuid, dest: p.comp.shape.uuid, direction:'p2t'})
    var line = 0;
    n_tab = 0;
    registerForEach = 0;
    registerClear = 0;
    //removeFromDOM = 0;
    registerUserData= [{comp:{shape: {removeFromDOM: ()=>{line++;}, line:{}}}}];
    layoutUMark = 0;
    
    t.addConnector('deletion');
    
    assert.equal(registerForEach, 1, "foreach count");
    assert.equal(line, 1, "remove count");
    assert.equal(registerClear, 2, "clear count");

    /** TODO: fix it  */
    //assert.equal(layoutUMark, 5, "umark count");
    
});

QUnit.test("test andsplit", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('transition', {type:'automatic',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;
    
    t.addConnector('andsplit');
    
    assert.equal(layoutClosest, 4, "closestposition count");
    assert.equal(n_tab, 8, "register count");
    });

QUnit.test("test dowhile", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('transition', {type:'automatic',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;
    
    t.addConnector('dowhile');
    
    assert.equal(layoutClosest, 2, "closestposition count");
    assert.equal(n_tab, 5, "register count");
});

QUnit.test("onclick set config", assert => {
    var t = new Component('transition', {type:'dummy'});
    Component.config  = {node: null};
    t.onclick();
    assert.equal(Component.config.node, t, "component to be configured");

});

QUnit.test("onclick clears config when click on actif configuration", assert => {
    var t = new Component('transition', {type:'dummy'});
    Component.config  = {node: null};
    t.onclick();
    t.onclick();
    assert.equal(Component.config.node, null, "component to be configured");

});

QUnit.test("test xorsplit", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;

    t.addConnector('xorsplit');

    assert.equal(layoutClosest, 3, "closestposition count");
    assert.equal(n_tab, 7, "register count");
    });

QUnit.test("test multi choice", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;

    t.addConnector('multichoice');

    assert.equal(layoutClosest, 10, "closestposition count");
    assert.equal(n_tab, 23, "register count");
    });

QUnit.test("test while", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;

    t.addConnector('while');

    assert.equal(layoutClosest, 2, "closestposition count");
    assert.equal(n_tab, 5, "register count");
});


QUnit.test("test deferredchoice", assert => {
    layout.init(10, 10, 40, 40);

    var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

    n_tab = 0;
    layoutClosest = 0;

    t.addConnector('deferredchoice');

    assert.equal(layoutClosest, 6, "closestposition count");
    assert.equal(n_tab, 13, "register count");
});
