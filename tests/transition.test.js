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

QUnit.module("Transition");

QUnit.test("Transition without name is a dummy transition with dummy name", assert =>{
    var  t = new Transition();
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
    assert.equal(t.name, "dummy", "the type of the place is 'intermediary'");
});

QUnit.test("a transition with only a name declare a dummy transition", assert =>{
    var  t = new Transition("foobar");
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
});

QUnit.test("a dummy transition can have specific name", assert =>{
    var  t = new Transition("foobar", "dummy");
    assert.equal(t.type, "dummy", "the type of the place is 'intermediary'");
    assert.equal(t.name, "foobar", "the type of the place is 'intermediary'");
});

QUnit.test("the name of automatic name is required", assert =>{
    assert.throws(
	function() {
	    new Transition(null, "automatic");
	},
	"transition name is required"
    );
});

QUnit.test("automatic transition must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "automatic");
    assert.equal(t.type, "automatic", "automatic transition type");
    assert.equal(t.name, "foobar", "automtic transition name");
});

QUnit.test("the name of manual name is required", assert =>{
    assert.throws(
	function() {
	    new Transition(null, "manual");
	},
	"name of manual transition is required"
    );
});

QUnit.test("manual transition must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "manual");
    assert.equal(t.type, "manual", "manual transition type");
    assert.equal(t.name, "foobar", "manual transition name");
});

QUnit.test("clock transition can be defined without name", assert =>{
    var  t = new Transition(null, "clock");
    assert.equal(t.type, "clock", "clock transition type");
    assert.equal(t.name, "clock", "clock transition name");
});

QUnit.test("clock transition must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "clock");
    assert.equal(t.type, "clock", "clock transition type");
    assert.equal(t.name, "foobar", "clock transition name");
});

QUnit.test("the name of asub name is required", assert =>{
    assert.throws(
	function() {
	    new Transition(null, "asub");
	},
	"name of asub transition is required"
    );
});

QUnit.test("the name of ssub name is required", assert =>{
    assert.throws(
	function() {
	    new Transition(null, "ssub");
	},
	"name of asub transition is required"
    );
});

QUnit.test("synch sub. process must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "ssub");
    assert.equal(t.type, "ssub", "ssub  transition type");
    assert.equal(t.name, "foobar", "ssub transition name");
});



QUnit.test("asynch sub. process must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "asub");
    assert.equal(t.type, "asub", "asub  transition type");
    assert.equal(t.name, "foobar", "asub transition name");
});

QUnit.test("the name of event name is required", assert =>{
    assert.throws(
	function() {
	    new Transition(null, "event");
	},
	"name of event transition is required"
    );
});

QUnit.test("event transition must be defined with its name and type", assert =>{
    var  t = new Transition("foobar", "event");
    assert.equal(t.type, "event", "event  transition type");
    assert.equal(t.name, "foobar", "event transition name");
});

QUnit.test("a transition with wrong type must throw an exception", assert =>{
    assert.throws(
	function() {
	    new Transition("foobar", "foo");
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
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");
});

QUnit.test("the basic shape of a manual transition is a rectange with a clock above", assert =>{
    var  t = new Transition("foobar", "manual");

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, MWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, MHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");

    
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
    var  t = new Transition("foobar", "automatic");

    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    assert.equal(t.shape.form.width, AWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, AHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");
    
    
    
    assert.equal(t.shape.form.children[0].child.type, "text", "type of child is text");
    assert.equal(t.shape.form.children[0].child.text, "foobar", "text value is tranisition name");
});

QUnit.test("the basic shape of a event transition is a rectange with a clock above", assert =>{
    var  t = new Transition("foobar", "event");

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, EWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, EHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");

    
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
    var  t = new Transition("foobar", "clock");

    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, CWidth, "the width must be 20 px");
    assert.equal(t.shape.form.height, CHeight, "the height must be 40 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");
    
    
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
    var  t = new Transition("foobar", "asub");
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");
    
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
    var  t = new Transition("foobar", "ssub");
    assert.equal(t.shape.type, "rectangle", "the shape is a circle");
    assert.equal(t.shape.form.width, SWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, SHeight, "the height must be 35 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");

    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(t.shape.form.c_points.length, 0, "deletion of all c_points of the shape");

    
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
    var  t = new Transition("foobar", "automatic");
    t.setGate("xor_join");
    assert.equal(t.shape.type, "rectangle", "the shape is a rectangle");
    //assert.equal(t.shape.gate, "xor_join", "gate name");
    assert.equal(t.shape.form.width, AWidth, "the width must be 15 px");
    assert.equal(t.shape.form.height, AHeight, "the height must be 50 px");
    assert.equal(t.shape.form.fill, "white", "the color must be black");
    assert.equal(t.shape.form["stroke-width"], TStroke, "the border width must  be 3 px");
    assert.equal(t.shape.form.children[1].child.type, "polyline", "type of child is polylines");

});

QUnit.test("we only support visual representation of xor_join gate for clock", assert =>{
    var  t = new Transition("foobar", "clock");
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
    var  t = new Transition("foobar", "manual");
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
    var  t = new Transition("foobar", "event");
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
    var  t = new Transition("foobar", "asub");
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
