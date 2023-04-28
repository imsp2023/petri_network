const DWidth  = 20;
const DHeight = 50;

const AWidth  = 20;
const AHeight = 50;

const MWidth  = 20;
const MHeight = 50;

const EWidth  = 20;
const EHeight = 50;

const CWidth  = 20;
const CHeight = 50;

const SWidth  = 30;
const SHeight = 60;

const TStroke = '2px';

const T_ImSZ = 20;

QUnit.module("Transition");

QUnit.test("Transition without name is a dummy transition with dummy name", assert =>{
    var  t = new Transition();
    assert.equal(t.type, "dummy", "the type of the transition is 'intermediary'");
    assert.equal(t.name, "dummy", "the type of the transition is 'intermediary'");
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
    assert.equal(t.type, "dummy", "the type of the transition is 'intermediary'");
});

QUnit.test("a dummy transition can have specific name", assert =>{
    var  t = new Transition({name: "foobar", type: "dummy"});
    assert.equal(t.type, "dummy", "the type of the transition is 'intermediary'");
    assert.equal(t.name, "foobar", "transition name");
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

QUnit.test("transition declares app attribute when not define within props", assert =>{
    var  t = new Transition({name: "foobar", type: "automatic"});
    assert.ok(t.app, "app attribute");
});

QUnit.test("transition uses app attribute defined within props", assert =>{
    var  t = new Transition({name: "foobar", type: "automatic", app: 2});
    assert.equal(t.app, 2, "app attribute");
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
    assert.equal(t.shape.shape.width, DWidth, "the width must be 20 px");
    assert.equal(t.shape.shape.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "black", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

        assert.equal(t.shape.shape.children.length, 0, "children length");
});
// TODO: to be implemented
// QUnit.test("vertex are invisible", assert =>{
//     var  t = new Transition(), i;
//     //for(i=0; i<t.shape.shape.vertex.length; i++)
//     assert.equal(t.shape.shape.vertex[0].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[1].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[2].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[3].shape.shape.fill, "none", "vertex fill");
// });

// QUnit.test("c_points are invisible", assert =>{
//     var  t = new Transition(), i;
//     //for(i=0; i<t.shape.shape.vertex.length; i++)
//     assert.equal(t.shape.shape.vertex[0].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[1].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[2].shape.shape.fill, "none", "vertex fill");
//     assert.equal(t.shape.shape.vertex[3].shape.shape.fill, "none", "vertex fill");
// });

QUnit.test("the basic shape of a manual transition is a rectange with an arrow above", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, MWidth, "the width must be 20 px");
    assert.equal(t.shape.shape.height, MHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

    assert.equal(t.shape.shape.children.length, 2, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.shape.children[0].child.path, "src/images/user1.png", "clock image path");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.shape.children[0].child.offsetY, 0, "image offsetY");
    

    /* TODO: test displaying  */
    assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");

    // assert.equal(t.shape.shape.children[1].child.x, t.shape.shape.children[0].child.x, "text and image has same x");
    // assert.equal(t.shape.shape.children[1].child.y, t.shape.shape.children[0].child.x, "rectangle has same y");

    //  assert.equal(t.shape.shape.children[1].child.offsetX, 0, "text offsetX");
    // assert.equal(t.shape.shape.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("the basic shape of an automatic transition is a black rectange with its name above", assert =>{
    var  t = new Transition({type: "automatic", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    assert.equal(t.shape.shape.width, AWidth, "transition width");
    assert.equal(t.shape.shape.height, AHeight, "transition height");
    assert.equal(t.shape.shape.fill, "white", "color");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

        assert.equal(t.shape.shape.children.length, 2, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.shape.children[0].child.path, "src/images/service2.png", "image src");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.shape.children[0].child.offsetY, 0, "image offsetY");


    assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");
});

QUnit.test("the basic shape of a event transition is a rectange with an envelope above", assert =>{
    var  t = new Transition({type: "event", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, EWidth, "the width must be 20 px");
    assert.equal(t.shape.shape.height, EHeight, "the height must be 40 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");


    assert.equal(t.shape.shape.children.length, 1, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.shape.children[0].child.path, "src/images/envelope.png", "clock image path");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.shape.children[0].child.offsetY, 0, "image offsetY");
    
    // assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    // assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");

    // assert.equal(t.shape.shape.children[1].child.x, t.shape.shape.children[0].child.x, "text and image has same x");
    // assert.equal(t.shape.shape.children[1].child.y, t.shape.shape.children[0].child.x, "rectangle has same y");

    //  assert.equal(t.shape.shape.children[1].child.offsetX, 0, "text offsetX");
    // assert.equal(t.shape.shape.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("the basic shape of a clock transition is a white rectange with a clock and its name above", assert =>{
    var  t = new Transition({type: "clock", name: "foobar"});

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, CWidth, "the width must be 20 px");
    assert.equal(t.shape.shape.height, CHeight, "the height must be 40 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

        assert.equal(t.shape.shape.children.length, 1, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.shape.children[0].child.path, "src/images/clock2.png", "clock image path");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.shape.children[0].child.offsetY, 0, "image offsetY");
    
    // assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    // assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");

    // assert.equal(t.shape.shape.children[1].child.x, t.shape.shape.children[0].child.x, "text and image has same x");
    // assert.equal(t.shape.shape.children[1].child.y, t.shape.shape.children[0].child.x, "rectangle has same y");

    //  assert.equal(t.shape.shape.children[1].child.offsetX, 0, "text offsetX");
    // assert.equal(t.shape.shape.children[1].child.offsetY, -10, "text offsetY");

});

QUnit.test("the basic shape of a asub transition is a double rectange with its name above", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

    assert.equal(t.shape.shape.children.length, 2, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "rectangle", "type of child is rectangle");
    assert.equal(t.shape.shape.children[0].child.width, 20, "width of the child");
    assert.equal(t.shape.shape.children[0].child.height, 50, "height of the child");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.y, "rectangle has same y");

    assert.equal(t.shape.shape.children[0].child.offsetX, 5, "child offset");
    assert.equal(t.shape.shape.children[0].child.offsetX, 5, "child offset");

    assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");
    
    // assert.equal(t.shape.shape.children[1].child.x, t.shape.shape.children[0].child.x, "text and image has same x");
    // assert.equal(t.shape.shape.children[1].child.y, t.shape.shape.children[0].child.x, "rectangle has same y");

    //  assert.equal(t.shape.shape.children[1].child.offsetX, 0, "text offsetX");
    // assert.equal(t.shape.shape.children[1].child.offsetY, -10, "text offsetY");

});

QUnit.test("the basic shape of a ssub transition is a double rectange with its name above", assert =>{
    var  t = new Transition({type: "ssub", name: "foobar"});
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");

    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");

    assert.equal(t.shape.shape.children.length, 2, "children length");

    assert.equal(t.shape.shape.children[0].child.type, "rectangle", "type of child is rectangle");
    assert.equal(t.shape.shape.children[0].child.width, 20, "width of the child");
    assert.equal(t.shape.shape.children[0].child.height, 50, "height of the child");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.y, "rectangle has same y");

    assert.equal(t.shape.shape.children[0].child.offsetX, 5, "child offset");
    assert.equal(t.shape.shape.children[0].child.offsetX, 5, "child offset");

    assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");

    // assert.equal(t.shape.shape.children[1].child.x, t.shape.shape.children[0].child.x, "text and image has same x");
    // assert.equal(t.shape.shape.children[1].child.y, t.shape.shape.children[0].child.x, "rectangle has same y");

    //  assert.equal(t.shape.shape.children[1].child.offsetX, 0, "text offsetX");
    // assert.equal(t.shape.shape.children[1].child.offsetY, -10, "text offsetY");
});

QUnit.test("we only support visual representation of xor_join gate for dummy", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "black", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[0].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for automatic", assert =>{
    var  t = new Transition({type: "automatic", name: "foobar"});
    t.setGate("xor_join");!!
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, AWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, AHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[2].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for clock", assert =>{
    var  t = new Transition({type: "clock", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, CWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, CHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[1].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for manual", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, MWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, MHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[2].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for event", assert =>{
    var  t = new Transition({type: "event", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, EWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, EHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[1].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for asub", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.shape.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, SHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.shape.children[2].child.type, "polyline", "type of child is polylines");

});


QUnit.test("setGate removes existing gate if new gate is not xor_join", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.shape.children.length, 1, "one child");
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    
    t.setGate("xor_split");
    assert.equal(t.shape.shape.children.length, 0, "no child");

    
    assert.equal(t.shape.shape.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "black", "the color must be black");
    assert.equal(t.shape.shape.children.length, 0, "no child");

});

QUnit.test("adding xor_join on existing xor_join will be ignored", assert =>{
    var  t = new Transition();
    t.setGate("xor_join");
    assert.equal(t.shape.shape.children.length, 1, "one child");

    t.setGate("xor_join");
    assert.equal(t.shape.shape.children.length, 1, "one child after second call");
    
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.shape.width, DWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, DHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "black", "the color must be black");
    assert.equal(t.shape.shape["stroke-width"], TStroke, "the border width must  be 3 px");
});

QUnit.test("default position is (0, 0) when not provided", assert => {
    var p = new Transition();

    assert.equal(p.shape.shape.x, 0, "x-axis");
    assert.equal(p.shape.shape.y, 0, "-axis");
});

QUnit.test("Ajust transition position when cell size is provided", assert => {
    var p = new Transition({type:'dummy', cWidth: 40, cHeight: 60});

    assert.equal(p.shape.shape.x, 10, "x-axis");
    assert.equal(p.shape.shape.y, 5, "-axis");
});

QUnit.test("setType do nothing when new type is the same as the old one", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    t.setType("manual");
    assert.equal(t.type, "manual", "transition type");
});

QUnit.test("setType set new type", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    t.setType("asub");
    assert.equal(t.type, 'asub', "transition type");
});

QUnit.test("setType removes all children first", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    removeFromDOM = 0;
    t.setType("asub");
    assert.equal(removeFromDOM, 2, "number of removed children");
});

QUnit.test("setType clears app attribute", assert =>{
    var  t = new Transition({type: "manual", name: "foobar"});
    t.app.toto = 'too'

    assert.equal(Object.keys(t.app).length, 1, "app attribute length");
    t.setType("asub");
    assert.equal(Object.keys(t.app).length, 0, "app attribute length");
    });

QUnit.test("setType set rect shape according to type value", assert =>{
    var  t = new Transition({type: "asub", name: "foobar"});
    t.setType("manual");

    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    assert.equal(t.shape.shape.width, MWidth, "the width must be 15 px");
    assert.equal(t.shape.shape.height, MHeight, "the height must be 50 px");
    assert.equal(t.shape.shape.fill, "white", "the color must be black");

    assert.equal(t.shape.shape.children.length, 2, "number of children");


    assert.equal(t.shape.shape.children[0].child.type, "image", "type of child is image");
    assert.equal(t.shape.shape.children[0].child.path, "src/images/user1.png", "image path");

    assert.equal(t.shape.shape.children[0].child.x, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.y, t.shape.shape.x, "rectangle and image has same x");
    assert.equal(t.shape.shape.children[0].child.offsetX, 0, "iamge offsetX");
    assert.equal(t.shape.shape.children[0].child.offsetY, 0, "image offsetY");


    assert.equal(t.shape.shape.children[1].child.type, "text", "type of child is text");
    assert.equal(t.shape.shape.children[1].child.text, "foobar", "text value is tranisition name");

});
