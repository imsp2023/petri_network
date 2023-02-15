QUnit.module("Place");

QUnit.test("Default circle representation of a place", assert =>{
    var  p = new Place();

    assert.equal(p.shape.form.r, 20, "the radius must be 10 px");
    assert.equal(p.shape.form.fill, "white", "the color must be black");
    assert.equal(p.shape.form["stroke-width"], "3px", "the border width must  be 3 px");
    assert.equal(p.shape.form["stroke"], "black");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.vertex.length, 0, "deletion of all vertex of the shape");
    assert.equal(p.shape.form.c_points.length, 0, "deletion of all c_points of the shape");
});


QUnit.test("Creation of place by default", assert => {
    var p = new Place();

    assert.equal(p.type, "intermediary", "the type of the place is \
'intermediary'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
});


QUnit.test("Checking that the shape is effectively a circle ", assert => {
    aya.settype("cir");

    assert.throws(
	function() {
	    new Place()
	},
	"the shape isn't a circle"
    );
    aya.settype(null);
});


QUnit.test("Check that the creation of a start place has a green circle", assert => {
    var p = new Place("start");

    assert.equal(p.type, "start", "the type of the place is 'start'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.fill, "white", "the color must be 'green'");
    assert.equal(p.shape.form["stroke"], "green", "border color must be green");

});


QUnit.test("Check that the creation of a intermediary place has a black circle", assert => {
    var p = new Place("intermediary");

    assert.equal(p.type, "intermediary", "the type of the place is 'intermediary'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.fill, "white", "the color must be 'white'");
    assert.equal(p.shape.form["stroke"], "black", "border color must be 'black'");

});

QUnit.test("Check that the creation of a end place has a red circle", assert => {
    var p = new Place("end");

    assert.equal(p.type, "end", "the type of the place is 'end'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.fill, "white", "the color must be 'white'");
    assert.equal(p.shape.form["stroke"], "red", "border color must be 'red'");
});

QUnit.test("Checking that a wrong type throws an exception", assert => {
    assert.throws(
	function(){
	    new Place("wrong");
	},
	"the type is wrong"
    );
});

/**********************panel of possible action************************/

QUnit.test("Ensure that  we define an hover event on the Place with addPanel() as callback", assert => {
    var p = new Place("start");
    var ev = null;
    for (e of p.shape.events)
	if (e["mouseover"])
	    ev = e;
    assert.ok(ev, "mouseover event is defined");
});


QUnit.test("addPanel() opens an empty panel when we hover over a place", assert => {
    var p = new Place("end");

    p.addPanel();

    assert.ok(p.shape.form.children.length, "the shape has a child");
    assert.equal(p.shape.form.children[0].child.type, "rectangle", "panel has a rectangle as support");
    assert.equal(p.shape.form.children[0].child.form["stroke-width"], "0px", "the border width must  be 2 px");
});


QUnit.test("add all actions on the panel when we hover over it", assert => {
    var p = new Place("start");

    p.addPanel();

    var action = [
	{x:  20, y: -30, name: "deletion", path: "images/trash.png" },
	{x:  20 + 20, y: -30, name: "transition", path: "images/transition.png"},
	{x:  20 + 20 * 2, y: -30, name: "edge", path: "images/edge.png" },
    ];

    assert.equal(p.shape.form.children.length, 4, "panel has 4 children");
    p.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    assert.equal(child.type, "image", "children are images");
	    assert.equal(child.width, 30, "the width of the child must be 30 px");
	    assert.equal(child.height, 30, "the height of the child must be 30 px");
	    assert.equal(child.path, action[index - 1].path, "check the correct path of each image");
	}
    });
});


QUnit.test("actions are display on two columns", assert => {
    var p = new Place("start");

    p.addPanel();

    var action = [
	{x:  20, y: -30, name: "deletion", path: "../images/trash.png" },
	{x:  20 + 35, y: -30, name: "transition", path: "../images/transition.png"},
	{x:  20, y: 5, name: "edge", path: "../images/edge.png" },
    ];

    p.shape.form.children.map(({child}, index) => {
	if (index != 0){
	    console.log(child);
	    assert.equal(child.x, action[index - 1].x, "setting the abscissa of the child");
	    assert.equal(child.y, action[index - 1].y, "setting the ordinate of the child");
	    assert.equal(child.offsetX, 5, "setting offsetX");
	    assert.equal(child.offsetY, 0, "setting offsetY");
	}
    });
});

QUnit.test("panel must stay opened when hovering on actions", assert => {
    var p = new Place("start");

    p.addPanel();

    assert.equal(p.shape.form.children[0].child.offsetX, 0, "setting offsetX to 0 px");
    assert.equal(p.shape.form.children[0].child.offsetY,  0, "setting offsetY to  0 px");
});


QUnit.test("panel must be delete when leaving panel", assert => {
    var p = new Place("start");

    p.addPanel();

    var ev = null;
    for (e of p.shape.form.children[0].child.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the rectangle child");
});


QUnit.test("panel must be delete when leaving place", assert => {
    var p = new Place("start");

    p.addPanel();

    var ev = null;
    for (e of p.shape.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the place");
});


QUnit.test("panel must stay opened when mouse is moving from place to panel", assert => {
    var p = new Place("start");

    p.addPanel();

    var cpt = 0;
    for (e of p.shape.events)
	if (e["mouseover"])
	    cpt++;
    assert.equal(cpt, 1, "there must have 1 mousever event defined on the placel");
    // adding mouseover to the children to allow panel to stay open when moving on its children
});
