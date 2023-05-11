QUnit.module("LassoComponent");


QUnit.test("instantiation of a component returns an object with type and comp attributes", assert => {
    var obj = new LassoComponent();
    assert.equal(obj.type, 'lasso', "type of component must be a 'transition'");
    assert.equal(typeof obj.comp, 'object', "comp attribute must be an object");
});

QUnit.test("instantiation of a component also initialize its actions", assert => {
    var obj = new LassoComponent();
    assert.ok(obj.actions, "lasso actions");
});

QUnit.test("instantiation of a component create an empty array for selected component", assert => {
    var obj = new LassoComponent();
    assert.equal(obj.selectedComp.length, 0, "number of selected component");
});

QUnit.test("instantiation of a component initialize panel position", assert => {
    var obj = new LassoComponent();
    assert.equal(obj.panelPos, -1, "panel position");
});

QUnit.test("Instantiation of a component must be registered", assert => {
    n_tab = 0;
    var cp = new LassoComponent();
    assert.equal(n_tab, 1, "register count");
});

QUnit.test("use the default position when not provided", assert => {
    layoutAjust = 0;
    var props = {};
//    layout.init(10, 10, 100, 100);
    var obj = new LassoComponent(props);
    assert.equal(obj.comp.shape.x, 0, "default value");
    assert.equal(obj.comp.shape.y, 0, "default value");
});

QUnit.test("can use provided position", assert => {
    layoutAjust = 0;
    var props = {x: 100, y: 100};
    var obj = new LassoComponent(props);
    assert.equal(obj.comp.shape.x, 100, "default value");
    assert.equal(obj.comp.shape.y, 100, "default value");

});

// QUnit.test("mark component position on layout", assert => {
//     layoutMark = 0;
//     var obj = new LassoComponent();
//     assert.equal(layoutMark, 1, "mark count");
// });



/************************************** component events *************************************/
QUnit.test("add mouseover event on component", assert => {
    var t = new LassoComponent( {}), ev;

    for (e of t.comp.shape.events)
	if (e["mouseover"])
	    ev = e;
    assert.ok(ev, "mouseover event is defined on the component");
});

QUnit.test("add mouseup event on component", assert => {
    var t = new LassoComponent( {}), ev;

    for (e of t.comp.shape.events)
	if (e["mouseup"])
	    ev = e;
    assert.ok(ev, "mouseup event is defined on the component");
});

QUnit.test("add mouseleave event on component", assert => {
    var t = new LassoComponent( {});
    var ev = null;
    for (e of t.comp.shape.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the component");
});


QUnit.test("add mousedown event on component", assert => {
    var t = new LassoComponent( {});
    var ev = null;
    for (e of t.comp.shape.events)
	if (e["mousedown"])
	    ev = e;
    assert.ok(ev, "mousedown event");
});


/***************************** locked components ***********************************/
QUnit.test("lockcomponent get marked cells", assert =>{
    layoutMarkedCells = 0;

    var cp = new LassoComponent( {});

    cp.lockComponent();
    assert.equal(layoutMarkedCells, 1, "marked cells count");
    
});

QUnit.test("lockcomponent delete lasso when no selected component", assert =>{
    layoutMarkedCells = 0;
    registerClear = 0;
    
    var cp = new LassoComponent( {});

    cp.lockComponent();
    assert.equal(registerClear, 1, "marked cells count");
    
});

QUnit.test("lockcomponent locks when selected component", assert =>{
    layoutMarkedCells = 0;
    layoutCellFound = true;
    var cp = new LassoComponent( {});
    var r = {
	type: 'transition',
	comp: {
	    shape: {
		events:[],
		shape: {
		    children: [],
		    deleteAllEvents: ()=>{
			deleteAll = 1;
		    },
		    addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
			this.shape.events.push(ev);
		    },
		    x: 0,
		    y: 0
		}
	    }}};
    n_tab = 0;
    tab[0] = r;
    cp.lockComponent();
    assert.equal(cp.selectedComp.length, 1, "marked cells count");
    
});

QUnit.test("lockcomponent save selected components", assert =>{
    layoutMarkedCells = 0;
    layoutCellFound = true;
    
    var l = new LassoComponent({});
    var r = {
	type: 'transition',
	comp: {
	    shape: {
		events:[],
		shape: {
		    children: [],
		    deleteAllEvents: ()=>{
			deleteAll = 1;
		    },
		    addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
			this.shape.events.push(ev);
		    },
		    x: 0,
		    y: 0
		}
	    }}};
    
    n_tab = 0;
    tab[0] = r;
    
    l.lockComponent();

    assert.equal(l.selectedComp.length, 1, "lasso selectedComp");
    assert.equal(l.selectedComp[0].type, 'transition', "component type");
});

QUnit.test("lockcomponent disable all event from children", assert =>{
    layoutMarkedCells = 0;
    layoutCellFound = true;
    var deleteAll = 0;
    var l = new LassoComponent({});
    var r = {
	type: 'transition',
	comp: {
	    shape: {
		events:[],
		shape: {
		    children: [],
		    deleteAllEvents: ()=>{
			deleteAll = 1;
		    },
		    addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
			this.shape.events.push(ev);
		    },
		    x: 0,
		    y: 0
		}
	    }}};
    

    n_tab = 0;
    tab[0] = r;
    l.lockComponent();

    assert.equal(deleteAll, 1, "deleteallevents count");
});

QUnit.test("move makes move compoment", assert =>{
    layoutMarkedCells = 0;

    var cp = new LassoComponent( {});

    cp.move(10, 10);
    assert.equal(cp.comp.shape.x, 10, "lasso x pos");
    assert.equal(cp.comp.shape.y, 10, "lasso y pos");
    
});

QUnit.test("move makes move selected compoment", assert =>{
    layoutMarkedCells = 0;
    layoutCellFound = true;

    var cp = new LassoComponent( {});
    var r = {
	type: 'transition',
	comp: {
	    shape: {
		events:[],
		shape: {
		    children: [],
		    shift: (dx, dy)=>{r.comp.shape.x += dx;r.comp.shape.y += dy;},
		    deleteAllEvents: ()=>{
			deleteAll = 1;
		    },
		    addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
			this.shape.events.push(ev);
		    },
		    x: 0,
		    y: 0
		}
	    }}};
    

    n_tab = 0;
    tab[0] = r;
    cp.lockComponent();
    cp.move(10, 10);
    assert.equal(cp.selectedComp[0].comp.shape.x, 10, "lasso x pos");
    assert.equal(cp.selectedComp[0].comp.shape.y, 10, "lasso y pos");
    
});


// QUnit.test("lasso sets from attribute with start point index", assert =>{
//     var l = new Lasso({x: 53, height: 33});

//     assert.equal(l.from,i, 5, "lasso from.x");
//     assert.equal(l.from.j, 3, "lasso from.y");

// });

// QUnit.test("lasso sets from attribute with start point index", assert =>{
//   var l = new Lasso({x: 53, height: 33});

//   assert.equal(l.from,i, 5, "lasso from.x");
// 0  assert.equal(l.from.j, 3, "lasso from.y");

// });

// QUnit.test("lasso sets according to its width and height", assert =>{
//   var l = new Lasso({x: 53, height: 33, width: 20, height: 30});

//   assert.equal(l.to,i, 7, "lasso to.x");
//   assert.equal(l.to.j, 6, "lasso to.y");

// });



// QUnit.test("lasso returns empty array when no selected components", assert =>{
//   var cps;
//   layout.init(100, 100, 10, 10);

//   var l = new Lasso();
//   l.to = {i: 10, j: 10};
//   cps = getSelectedComp(l.from, l.to);
//   assert.notOk(cps, "selected components");
// });

// QUnit.test("lasso gets the selected components", assert =>{
//   var cps;
//   layout.init(100, 100, 10, 10);

//   layout.grid[22] = 1;
//   layout.grid[33] = ;
//   var l = new Lasso();
//   l.from{i: 2, j: 2};
//   l.to{i: 4, j: 4};
//   cps = getSelectedComp(l.from, l.to);
//   assert.ok(cps, "selected components");
//   assert.equal(cps.length, 2, "selected components length");
// });

// QUnit.test("lasso adds the selected components as children", assert =>{
//     layout.init(10, 10, 100, 100);
//   var l = new Lasso({width: 50, y: 80});
//   assert.equal(l.shape.x, 10, "x value");
//   assert.equal(l.shape.y, 10, "y value");
// });

// QUnit.test("lasso remove mouseover from the selected components as children", assert =>{
//     layout.init(10, 10, 100, 100);
//   var l = new Lasso({width: 50, y: 80});
//   assert.equal(l.shape.x, 10, "x value");
//   assert.equal(l.shape.y, 10, "y value");
// });

// QUnit.test("lasso rem(ove mousedown from the selected components as children", assert =>{
//     layout.init(10, 10, 100, 100);
//   var l = new Lasso({width: 50, y: 80});
//   assert.equal(l.shape.x, 10, "x value");
//   assert.equal(l.shape.y, 10, "y value");
// });

// QUnit.test("lasso remove mouseleave from the selected components as children", assert =>{
//   layout.init(10, 10, 100, 100);
//   var l = new Lasso({width: 50, y: 80});
//   assert.equal(l.shape.x, 10, "x value");
//   assert.equal(l.shape.y, 10, "y value");
// });

// QUnit.test("lasso remove mouseup from the selected components as children", assert =>{
//     layout.init(10, 10, 100, 100);
//   var l = new Lasso({width: 50, y: 80});
//   assert.equal(l.shape.x, 10, "x value");
//   assert.equal(l.shape.y, 10, "y value");
// });



/***************************** actions **************************************/
// QUnit.test("addConnector from place first removes panel when exist", assert => {
//     removePanel = 0;
//     var cp = new Component("place", {});
//     cp.comp.shape.panelPos = 0;
//     cp.addConnector('foobar');
//     assert.equal(removePanel, 1, "removepanel count");
// });

// QUnit.test("addConnector do not try to remove panel when it does not exist", assert => {
//     removePanel = 0;
//     var cp = new Component("place", {});
//     cp.comp.shape.panelPos = -1;
//     cp.addConnector('foobar');
//     assert.equal(removePanel, 0, "removepanel count");
// });


// QUnit.test("do nothing when we try to add transition from transition", assert => {
//     removePanel = 0;
//     cp = new Component("transition", {});

//     n_tab = 0;
//     cp.addConnector('transition');
//     assert.equal(removePanel, 0, "removepanel count");
//     /* no component is added to register */
//     assert.equal(n_tab, 0, "register count");
// });

// QUnit.test("do nothing when we try to add place from place", assert => {
//     removePanel = 0;
//     var cp = new Component("place", {});

//     n_tab = 0;
//     cp.addConnector('place');
//     assert.equal(removePanel, 0, "removepanel count");
//     /* no component is added to register */
//     assert.equal(n_tab, 0, "register count");
// });

// QUnit.test("do nothing when we try to add an edge from edge", assert => {
//     removePanel = 0;
//     var cp = new Component("edge", {});

//     n_tab = 0;
//     cp.addConnector('edge');
//     assert.equal(removePanel, 0, "removepanel count");
//     /* no component is added to register */
//     assert.equal(n_tab, 0, "register count");
// });

// QUnit.test("addConnector from place first removes panel", assert => {
//     removePanel = 0;
//     var cp = new Component("place", {});
//     cp.addConnector('transition');
//     assert.equal(removePanel, 0, "removepanel count");
// });


// QUnit.test("addConnector looks for a new position for the transition to be added", assert => {
//     layoutClosest = 0;
//     n_tab = 0;
//     var cp = new Component("place", {});
//     cp.addConnector('transition');
//     assert.equal(n_tab, 3, "register count");
//     assert.equal(layoutClosest, 1, "layoutClosest count");
// });

// QUnit.test("addConnector looks for a new position for the place to be added", assert => {
//     n_tab = 0;
//     layoutClosest = 0;
//     var cp = new Component("transition", {x:0,y:0});
//     cp.addConnector('place');
//     assert.equal(n_tab, 3, "register count");
//     assert.equal(layoutClosest, 1, "layoutClosest count");
// });

// QUnit.test("addConnector calls mark method five times to add transition", assert => {

//     layout.init(10, 10, 5, 5);
//     var cp = new Component("place", {x:0,y:0});
//     layoutMark = 0;
//     cp.addConnector('transition');

//     /* once for the compenents creation and four times by 
//        markEdge: closestposition stub always returns (2, 2)
//     */
//     assert.equal(layoutMark, 5, "layoutMark count");
// });

// /******* add edge ******************/
// QUnit.test("addConnector sets global variables (line, src)", assert => {
//     var cp = new Component("transition", {x:0,y:0});
//     cp.addConnector('edge');
//     assert.ok(Component.line, "line variable value");
//     assert.ok(Component.src, "src variable value");
// });

// QUnit.test("edgeComplete do nothing when no line", assert => {
//     lineRemove = 0;
//     Component.line = null;
//     Component.src = null;
//     var cp = new Component("transition", {x:0,y:0});
//     cp.edgeCompleted();
//     assert.equal(lineRemove, 0, "remove from DOM count");
// });

// QUnit.test("edgeCompleted deletes current line", assert => {
//     var cp = new Component("transition", {x:0,y:0});
//     lineRemove = 0;
//     cp.addConnector('edge');

//     cp.edgeCompleted(1);
//     assert.equal(lineRemove, 1, "remove from DOM count");
// });

// QUnit.test("edgeCompleted do not create the edge when target and src is the same type", assert => {
//     lineRemove = 0;
//     n_tab = 0;
//     var cp = new Component("transition", {x:0,y:0});
//     cp.addConnector('edge');
//     n_tab = 0;
//     cp.edgeCompleted(1);
//     assert.equal(lineRemove, 1, "remove from DOM count");
//     assert.equal(n_tab, 0, "register count");
// });

// QUnit.test("edgeCompleted registers an edge component", assert => {
//     lineRemove = 0;
//     layoutMark = 0;
//     n_tab = 0

//     layout.init(10, 10, 40, 40);
//     var cp = new Component("transition", {x:0,y:0});
//     cp.addConnector('edge');

//     var cp = new Component("place", {x:20,y:20});
//     layoutMark = 0;
//     cp.edgeCompleted();
//     assert.equal(lineRemove, 1, "remove from DOM count");
//     assert.equal(n_tab, 3, "register count");
//     assert.equal(layoutMark, 4, "layoutMark count");
// });

// /******************* component moving ***********************/
// QUnit.test("onMouseDown set state attribute", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     t.onMouseDown();
//     assert.equal(Component.state, 'moving', 'state value');
// });

// QUnit.test("onMouseDown stores transition position", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     t.onMouseDown();
//     assert.equal(Component.x, t.comp.shape.x, "x value");
//     assert.equal(Component.y, t.comp.shape.y, "y value");
// });

// QUnit.test("onMouseUp fix transition position", assert => {
//     var t = new LassoComponent( {type:'dummy'});

//     layoutAjust = 0;
//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(layoutAjust, 1, "ajust count");
// });

// QUnit.test("onMouseUp unmarks only old transition position  when no link", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     layoutUMark = 0;
//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(layoutUMark, 1, "umark count");
// });

// QUnit.test("onMouseUp marks transition position  when no link", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     layoutMark = 0;
//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(layoutMark, 1, "mark count");
    
// });

// QUnit.test("onMouseUp looks for component neighbors", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     registerForEach = 0;
//     registerUserData = [];
//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(registerForEach, 1, "foreach count");
// });

// QUnit.test("onMouseUp unmarks old edges  when neighbors", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     layout.init(10, 10, 40, 40);
//     registerUserData = [{comp:{shape: {redraw :()=>{},line:{}}}},
// 			{comp:{shape: {redraw :()=>{},line:{}}}}];
//     tab = [{comp:{shape: {shape:{x: 0, y: 0}}}},
// 	   {comp:{shape: {shape:{x: 0, y: 0}}}}];
//     n_tab = 0;
//     layoutUMark = 0;
    
//     Component.x = 20;
//     Component.y = 20;

//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(layoutUMark, 8, "umark count");
// });

// QUnit.test("onMouseUp marks edges  when neighbors", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     layout.init(10, 10, 40, 40);
//     layoutMark = 0;
        
//     Component.x = 0;
//     Component.y = 0;
    
//     registerUserData = [{comp:{shape: {redraw :()=>{},line:{}}}},
// 			{comp:{shape: {redraw :()=>{},line:{}}}}];
//     tab = [{comp:{shape: {shape:{x: 0, y: 0}}}},
// 	   {comp:{shape: {shape:{x: 0, y: 0}}}}];
//     n_tab = 0;
//     layoutUMark = 0;
//     Component.state  = 'moving';
    
//     t.comp.shape.x = 30;
//     t.comp.shape.y = 30;
    
//     t.onMouseUp();
//     assert.equal(layoutMark, 12, "mark count");
    
// });


// QUnit.test("onMouseUp clear state", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     layoutMark = 0;
//     registerUserData = [];
//     Component.state  = 'moving';
//     t.onMouseUp();
//     assert.equal(Component.state, null, "component state");
    
// });

// /********************** delete action ***********************/
// /* TODO: To be done */
// QUnit.test("delete only the component when no neighbor", assert => {
//     var t = new LassoComponent( {type:'automatic',name: 'foo'});

//     registerForEach = 0;
//     registerClear = 0;
//     removeFromDOM = 0;
//     registerUserData= [];
//     layoutUMark = 0;
    
//     t.addConnector('deletion');
    
//     assert.equal(registerForEach, 1, "foreach count");

//     assert.equal(registerClear, 1, "clear count");
//     assert.equal(layoutUMark, 1, "umark count");
    
// });

// QUnit.test("delete component and its edges when neighbors", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new LassoComponent( {type:'automatic',name: 'foo', x:0, y:0});
//     var p = new Component('place', {x:20, y:20});
//     var e = new Edge('edge', {src: t.comp.shape.uuid, dest: p.comp.shape.uuid, direction:'p2t'})
//     var line = 0;
//     n_tab = 0;
//     registerForEach = 0;
//     registerClear = 0;
//     //removeFromDOM = 0;
//     registerUserData= [{comp:{shape: {removeFromDOM: ()=>{line++;}, line:{}}}}];
//     layoutUMark = 0;
    
//     t.addConnector('deletion');
    
//     assert.equal(registerForEach, 1, "foreach count");
//     assert.equal(line, 1, "remove count");
//     assert.equal(registerClear, 2, "clear count");

//     /** TODO: fix it  */
//     //assert.equal(layoutUMark, 5, "umark count");
    
// });

// QUnit.test("test andsplit", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new LassoComponent( {type:'automatic',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;
    
//     t.addConnector('andsplit');
    
//     assert.equal(layoutClosest, 4, "closestposition count");
//     assert.equal(n_tab, 8, "register count");
//     });

// QUnit.test("test dowhile", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new LassoComponent( {type:'automatic',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;
    
//     t.addConnector('dowhile');
    
//     assert.equal(layoutClosest, 2, "closestposition count");
//     assert.equal(n_tab, 5, "register count");
// });

// QUnit.test("onclick set config", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     Component.config  = {node: null};
//     t.onclick();
//     assert.equal(Component.config.node, t, "component to be configured");

// });

// QUnit.test("onclick clears config when click on actif configuration", assert => {
//     var t = new LassoComponent( {type:'dummy'});
//     Component.config  = {node: null};
//     t.onclick();
//     t.onclick();
//     assert.equal(Component.config.node, null, "component to be configured");

// });

// QUnit.test("test xorsplit", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;

//     t.addConnector('xorsplit');

//     assert.equal(layoutClosest, 3, "closestposition count");
//     assert.equal(n_tab, 7, "register count");
//     });

// QUnit.test("test multi choice", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;

//     t.addConnector('multichoice');

//     assert.equal(layoutClosest, 10, "closestposition count");
//     assert.equal(n_tab, 23, "register count");
//     });

// QUnit.test("test while", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;

//     t.addConnector('while');

//     assert.equal(layoutClosest, 2, "closestposition count");
//     assert.equal(n_tab, 5, "register count");
// });


// QUnit.test("test deferredchoice", assert => {
//     layout.init(10, 10, 40, 40);

//     var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});

//     n_tab = 0;
//     layoutClosest = 0;

//     t.addConnector('deferredchoice');

//     assert.equal(layoutClosest, 6, "closestposition count");
//     assert.equal(n_tab, 13, "register count");
// });



// /**TODO: Register refactoring  */
// // QUnit.test("edgeCompleted use alternative path to connect two components with opposite edges", assert => {
// //     layout.init(10, 10, 40, 40);

// //     n_tab = 0;

// //     var altpath = {altpath=true};
// //     var t = new Component('place', {type:'intermediary',name: 'foo', x:0, y:0});
// //     var p = new LassoComponent( {type:'dummy',name: 'foo', x:0, y:0});
// //     var e = new Component('edge', {src: t.comp.shape.uuid,
// //                                  dest: p.comp.shape.uuid,

// //                                    direction: 't2p'});
// //     registerUserData = [];
// //     //registerUserData = [t, p, e, null];
// //     // registerUserData[0] = t;
// //     // registerUserData[1] = p;
// //     // registerUserData[2] = e;

// //     p.addConnector('edge');
// //     t.edgeCompleted();


// //     //registerUserData[3] = e;

// //     assert.ok(e.comp.shape.altpath, "alternative path");
// // });
