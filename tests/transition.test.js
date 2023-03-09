const DWidth  = 20;
const DHeight = 50;

const AWidth  = 20;
const AHeight = 50;

const MWidth  = 20;
const MHeight = 40;

const EWidth  = 20;
const EHeight = 40;

const CWidth  = 20;
const CHeight = 40;

const SWidth  = 30;
const SHeight = 60;

const TStroke = '2px';

const T_ImSZ = 20;

QUnit.module("Transition");

QUnit.test("Transition without name is a dummy transition with dummy name", assert =>{
    var  t = new Transition();
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
    assert.equal(t.name, "dummy", "the type of the place is 'intermediary'");
});

QUnit.test("the argument of transition component must be an object when provided", assert =>{
      assert.throws(
	function() {
	    new Transition("asub");
	},
	"wrong parameter"
    );
});

QUnit.test("a transition with only a name declare a dummy transition", assert =>{
    var  t = new Transition({name: "foobar"});
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
});

QUnit.test("a dummy transition can have specific name", assert =>{
    var  t = new Transition({name: "foobar", type: "dummy"});
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
    assert.equal(t.name, "foobar", "the type of the place is 'intermediary'");
});

QUnit.test("the name of automatic name is required", assert =>{
    assert.throws(
	function() {
	    new Transition({type: "automatic"});
	},
	"transition name is required"
    );
});

QUnit.test("automatic transition must be defined with its name and type", assert =>{
    var  t = new Transition({name: "foobar", type: "automatic"});
    assert.equal(t.type, "automatic", "automatic transition type");
    assert.equal(t.name, "foobar", "automtic transition name");
});

QUnit.test("the name of manual name is required", assert =>{
    assert.throws(
	function() {
	    new Transition({type: "manual"});
	},
	"name of manual transition is required"
    );
});

QUnit.test("manual transition must be defined with its name and type", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    assert.equal(t.type, "manual", "manual transition type");
    assert.equal(t.name, "foobar", "manual transition name");
});

QUnit.test("clock transition can be defined without name", assert =>{
    var  t = new Transition({type: "clock"});
    assert.equal(t.type, "clock", "clock transition type");
    assert.equal(t.name, "clock", "clock transition name");
});

QUnit.test("clock transition must be defined with its name and type", assert =>{
    var  t = new Transition({type: "clock", name: "foobar"});
    assert.equal(t.type, "clock", "clock transition type");
    assert.equal(t.name, "foobar", "clock transition name");
});

QUnit.test("the name of asub name is required", assert =>{
    assert.throws(
	function() {
	    new Transition({type: "asub"});
	},
	"name of asub transition is required"
    );
});

QUnit.test("the name of ssub name is required", assert =>{
    assert.throws(
	function() {
	    new Transition({type: "asub"});
	},
	"name of asub transition is required"
    );
});

QUnit.test("synch sub. process must be defined with its name and type", assert =>{
    var  t = new Transition({type: "ssub", name: "foobar"});
    assert.equal(t.type, "ssub", "ssub  transition type");
    assert.equal(t.name, "foobar", "ssub transition name");
});



QUnit.test("asynch sub. process must be defined with its name and type", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    assert.equal(t.type, "asub", "asub  transition type");
    assert.equal(t.name, "foobar", "asub transition name");
});

QUnit.test("the name of event name is required", assert =>{
    assert.throws(
	function() {
	    new Transition({type:"event"});
	},
	"name of event transition is required"
    );
});

QUnit.test("event transition must be defined with its name and type", assert =>{
    var  t = new Transition({type: "event", name: "foobar"});
    assert.equal(t.type, "event", "event  transition type");
    assert.equal(t.name, "foobar", "event transition name");
});

QUnit.test("a transition with wrong type must throw an exception", assert =>{
    assert.throws(
	function() {
	    new Transition({type: "foo", name: "foobar"});
	},
	"wrong transition type"
    );
});

QUnit.test("the basic shape of a transition must be a rectange", assert => {
    aya.settype("cir");

    assert.throws(
	function() {
	    new Transition()
	},
	"the shape isn't a rectange"
    );
    aya.settype(null);
});



QUnit.test("the basic shape of a dummy transition is a black rectange", assert =>{
    var  t = new Transition();

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, DWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "black", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
});
// TODO: to be implemented
// QUnit.test("vertex are invisible", assert =>{
//     var  t = new Transition(), i;
//     //for(i=0; i<t.shape.form.vertex.length; i++)
//     assert.equal(t.shape.form.vertex[0].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[1].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[2].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[3].shape.form.fill, "none", "vertex fill");
// });

// QUnit.test("c_points are invisible", assert =>{
//     var  t = new Transition(), i;
//     //for(i=0; i<t.shape.form.vertex.length; i++)
//     assert.equal(t.shape.form.vertex[0].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[1].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[2].shape.form.fill, "none", "vertex fill");
//     assert.equal(t.shape.form.vertex[3].shape.form.fill, "none", "vertex fill");
// });

QUnit.test("the basic shape of a manual transition is a rectange with an arrow above", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, MWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, MHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    
    assert.equal(t.shape.form.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.form.children[0].child.path, "src/images/arrow.png", "clock image path");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.form.children[0].child.offsetY, -25, "image offsetY");
    
    
    assert.equal(t.shape.form.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[1].child.text, "foobar", "text value is tranisition name");
    
    assert.equal(t.shape.form.children[1].child.x, t.shape.form.children[0].child.x, "text and image has same x");
    assert.equal(t.shape.form.children[1].child.y, t.shape.form.children[0].child.x, "rectangle has same y");

     assert.equal(t.shape.form.children[1].child.offsetX, 0, "text offsetX");
    assert.equal(t.shape.form.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("the basic shape of an automatic transition is a black rectange with its name above", assert =>{
    var  t = new Transition({type: "automatic", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    assert.equal(t.shape.form.width, AWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, AHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
        assert.equal(t.shape.form.children[0].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[0].child.text, "foobar", "text value is tranisition name");
});

QUnit.test("the basic shape of a event transition is a rectange with a clock above", assert =>{
    var  t = new Transition({type: "event", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, EWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, EHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    
    assert.equal(t.shape.form.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.form.children[0].child.path, "src/images/clock.png", "clock image path");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.form.children[0].child.offsetY, -25, "image offsetY");
    
    assert.equal(t.shape.form.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[1].child.text, "foobar", "text value is tranisition name");
    
    assert.equal(t.shape.form.children[1].child.x, t.shape.form.children[0].child.x, "text and image has same x");
    assert.equal(t.shape.form.children[1].child.y, t.shape.form.children[0].child.x, "rectangle has same y");

     assert.equal(t.shape.form.children[1].child.offsetX, 0, "text offsetX");
    assert.equal(t.shape.form.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("the basic shape of a clock transition is a white rectange with a clock and its name above", assert =>{
    var  t = new Transition({type: "clock", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, CWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, CHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.form.children[0].child.path, "src/images/clock.png", "clock image path");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.x, "rectangle and image has same x");
    assert.equal(t.shape.form.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.form.children[0].child.offsetY, -25, "image offsetY");
    
    assert.equal(t.shape.form.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[1].child.text, "foobar", "text value is tranisition name");
    
    assert.equal(t.shape.form.children[1].child.x, t.shape.form.children[0].child.x, "text and image has same x");
    assert.equal(t.shape.form.children[1].child.y, t.shape.form.children[0].child.x, "rectangle has same y");

     assert.equal(t.shape.form.children[1].child.offsetX, 0, "text offsetX");
    assert.equal(t.shape.form.children[1].child.offsetY, -10, "text offsetY");
   
});

QUnit.test("the basic shape of a asub transition is a double rectange with its name above", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    
    assert.equal(t.shape.form.children[0].child.type, "rectangle", "type of child is rectangle");
    assert.equal(t.shape.form.children[0].child.width, 20, "width of the child");
    assert.equal(t.shape.form.children[0].child.height, 50, "height of the child");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x, "rectangle has same x");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.y, "rectangle has same y");

    assert.equal(t.shape.form.children[0].child.offsetX, 5, "child offset");
    assert.equal(t.shape.form.children[0].child.offsetX, 5, "child offset");

    assert.equal(t.shape.form.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[1].child.text, "foobar", "text value is tranisition name");
    
    assert.equal(t.shape.form.children[1].child.x, t.shape.form.children[0].child.x, "text and image has same x");
    assert.equal(t.shape.form.children[1].child.y, t.shape.form.children[0].child.x, "rectangle has same y");

     assert.equal(t.shape.form.children[1].child.offsetX, 0, "text offsetX");
    assert.equal(t.shape.form.children[1].child.offsetY, -10, "text offsetY");

});

QUnit.test("the basic shape of a ssub transition is a double rectange with its name above", assert =>{
    var  t = new Transition({type: "ssub", name: "foobar"});
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");

    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    
    assert.equal(t.shape.form.children[0].child.type, "rectangle", "type of child is rectangle");
    assert.equal(t.shape.form.children[0].child.width, 20, "width of the child");
    assert.equal(t.shape.form.children[0].child.height, 50, "height of the child");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x, "rectangle has same x");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.y, "rectangle has same y");

    assert.equal(t.shape.form.children[0].child.offsetX, 5, "child offset");
    assert.equal(t.shape.form.children[0].child.offsetX, 5, "child offset");

        assert.equal(t.shape.form.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[1].child.text, "foobar", "text value is tranisition name");
    
    assert.equal(t.shape.form.children[1].child.x, t.shape.form.children[0].child.x, "text and image has same x");
    assert.equal(t.shape.form.children[1].child.y, t.shape.form.children[0].child.x, "rectangle has same y");

     assert.equal(t.shape.form.children[1].child.offsetX, 0, "text offsetX");
    assert.equal(t.shape.form.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("we only support visual representation of xor_join gate for dummy", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "black", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[0].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for automatic", assert =>{
    var  t = new Transition({type: "automatic", name: "foobar"});
    t.setGate("xor_join");!!
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, AWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, AHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[1].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for clock", assert =>{
    var  t = new Transition({type: "clock", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, CWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, CHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[2].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for manual", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, MWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, MHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[2].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for event", assert =>{
    var  t = new Transition({type: "event", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, EWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, EHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[2].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for asub", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, SHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[2].child.type, "polyline", "type of child is polylines");

});


QUnit.test("setGate removes existing gate if new gate is not xor_join", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.form.children.length, 1, "one child");
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    
    t.setGate("xor_split");
    assert.equal(t.shape.form.children.length, 0, "no child");

    
    assert.equal(t.shape.form.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "black", "the color must be black");
    assert.equal(t.shape.form.children.length, 0, "no child");

});

QUnit.test("adding xor_join on existing xor_join will be ignored", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.form.children.length, 1, "one child");

    t.setGate("xor_join");
    assert.equal(t.shape.form.children.length, 1, "one child after second call");
    
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "black", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
});

QUnit.test("default position is (0, 0) when not provided", assert => {
    var p = new Transition();

    assert.equal(p.shape.form.x, 0, "x-axis");
    assert.equal(p.shape.form.y, 0, "-axis");
});

QUnit.test("Ajust place position when cell size is provided", assert => {
    var p = new Transition({type:'dummy', cWidth: 40, cHeight: 60});

    assert.equal(p.shape.form.x, 10, "x-axis");
    assert.equal(p.shape.form.y, 5, "-axis");
});

// /****************************** Possibles actions ****************************/

QUnit.test("Ensure that  we define an hover event on the Transition with addPanel() as callback", assert => {
    var t = new Transition();
    var ev = null;
    for (e of t.shape.events)
	if (e["mouseover"])
	    ev = e;
    assert.ok(ev, "mouseover event is defined");
});


QUnit.test("addPanel() opens an empty panel when we hover over a transition", assert => {
    var t = new Transition();

    t.addPanel();

    assert.ok(t.shape.form.children.length, "the shape has a child");
    assert.equal(t.shape.form.children[0].child.type, "rectangle", "panel has a rectangle as support");

    assert.equal(t.shape.form.children[0].child.x, t.shape.form.x+t.shape.form.width, "panel x-absc");
    assert.equal(t.shape.form.children[0].child.y, t.shape.form.y, "panel y-absc");
    
    assert.equal(t.shape.form.children[0].child.width,  2*20+10, "panel width");
    assert.equal(t.shape.form.children[0].child.height, 2*20+10, "panel height");
    
    assert.equal(t.shape.form.children[0].child.form["stroke-width"], "0px", "the border width must  be 2 px");
    assert.equal(t.shape.form.children[0].child.form["opacity"], 0, "panel opacity");
});

QUnit.test("panel must cover the transition", assert => {
    var t = new Transition();

    t.addPanel();

    assert.ok(t.shape.form.children.length, "the shape has a child");
    assert.equal(t.shape.form.children[0].child.type, "rectangle", "panel has a rectangle as support");
    assert.equal(t.shape.form.children[0].child.offsetX, -2, "panel offsetX");
    assert.equal(t.shape.form.children[0].child.offsetY, 0, "panel offsetY");

});


QUnit.test("add all actions on the panel when we hover over it", assert => {
    var t = new Transition();

    t.addPanel();

    var action = [
	{name: "place", path: "src/images/place.png"},
	{name: "edge", path: "src/images/edge2.png"},
	{name: "deletion", path: "src/images/delete.png"}
    ];

    assert.equal(t.shape.form.children.length, 4, "panel has 4 children");
    t.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    assert.equal(child.type, "image", "children are images");
	    assert.equal(child.width, T_ImSZ, "the width of the child must be 30 px");
	    assert.equal(child.height, T_ImSZ, "the height of the child must be 30 px");
	    assert.equal(child.path, action[index - 1].path, "check the correct path of each image");
	}
    });
});

QUnit.test("addpanel a mouseover on the images", assert => {
    var t = new Transition();

    t.addPanel();

    var cpt = 0;
    t.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseover"])
		    cpt++;
	}
    });

    assert.equal(cpt, t_actions.length, "mouseover count");
});

QUnit.test("addpanel a mouseleave on the images", assert => {
    var t = new Transition();
    var cpt = 0;
    
    t.addPanel();
    t.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseleave"])
		    cpt++;
	}
    });
    assert.equal(cpt, t_actions.length, "mouseleave count");
});

QUnit.test("addpanel a mousedown on the images", assert => {
    var t = new Transition();

    t.addPanel();

    var cpt = 0;

    t.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mousedown"])
		    cpt++;
	}
    });
    assert.equal(cpt, t_actions.length, "mousedown count");
});



QUnit.test("actions are display on two columns", assert => {
    var t = new Transition();

    t.addPanel();

    var action = [
	{x:  DWidth, y: 0, name: "place", path: "src/images/place.png"},
	{x:  DWidth + T_ImSZ, y: 0, name: "edge", path: "src/images/edge.png" },
	{x:  DWidth, y: T_ImSZ+5, name: "deletion", path: "src/images/times.png" }
    ];

    t.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    console.log(child);
	    assert.equal(child.x, action[index - 1].x, "setting the abscissa of the child");
	    assert.equal(child.y, action[index - 1].y, "setting the ordinate of the child");
	    assert.equal(child.offsetX, 5, "setting offsetX");
	    assert.equal(child.offsetY, 0, "setting offsetY");
	}
    });
});


QUnit.test("add mouseleave event on panel", assert => {
    var t = new Transition();

    t.addPanel();

    var ev = null;
    for (e of t.shape.form.children[0].child.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the rectangle child");
});


QUnit.test("add mouseleave event on transition", assert => {
    var t = new Transition();

    t.addPanel();

    var ev = null;
    for (e of t.shape.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the transition");
});

QUnit.test("add mouseup event on transition in order to add an edge", assert => {
    var t = new Transition();
    var ev = null;
    for (e of t.shape.events)
	if (e["mouseup"])
	    ev = e;
    assert.ok(ev, "mouseup event is defined on the transition");
});


QUnit.test("panel must stay opened when mouse is moving from Transition to panel", assert => {
    var t = new Transition();

    t.addPanel();

    var cpt = 0;
    for (e of t.shape.events)
	if (e["mouseover"])
	    cpt++;
    assert.equal(cpt, 1, "there must have 1 mousever event defined on the transition");
});

QUnit.test("add mousedown event on transition", assert => {
    var t = new Transition();

    var ev = null;
    for (e of t.shape.events)
	if (e["mousedown"])
	    ev = e;
    assert.ok(ev, "mousedown event");
});




