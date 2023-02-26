QUnit.module("Place");

QUnit.test("Default circle representation of a place", assert =>{
    var  p = new Place();

    assert.equal(p.shape.form.r, 20, "the radius must be 10 px");
    assert.equal(p.shape.form.fill, "white", "the color must be black");
    assert.equal(p.shape.form["stroke-width"], "3px", "the border width must  be 3 px");
    assert.equal(p.shape.form["stroke"], "black");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
});



QUnit.test("Adding the place to Register", assert => {
    var p = new Place();
    n_tab = 0;
    tab[0] = 1;
    var cp = Register.find(p.shape.uuid);

    assert.ok(cp, "the place is well added");
});


QUnit.test("Removing mousedown, mouseover and mouseleave events on connection points of aya's component", assert => {
    var p = new Place();
//    p.shape.form.draw();
    p.shape.form.c_points.map((pt) => {
	assert.equal(pt.events["mousedown"], undefined, "mousedown event is removed from c_points");
	assert.equal(pt.events["mouseover"], undefined, "mouseover event is removed from c_points");
	assert.equal(pt.events["mouseleave"], undefined, "mouseleave event is removed from c_points");
    });
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
    color = "black";
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
	{x:  20, y: -30, name: "deletion", path: "src/images/trash.png" },
	{x:  20 + 20, y: -30, name: "transition", path: "src/images/transition.png"},
	{x:  20 + 20 * 2, y: -30, name: "edge", path: "src/images/edge.png" },
	{x:  20 + 35, y: 5, name: "setting", path: "src/images/setting.png" },
    ];

    assert.equal(p.shape.form.children.length, 5, "panel has 4 children");
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
	{x:  20 + 35, y: 5, name: "setting", path: "../images/setting.png" },
    ];

    p.shape.form.children.map(({child}, index) => {
	if (index != 0){
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

QUnit.test("Adding mousedown on every actions in the panel", assert => {
    var p = new Place();

    p.addPanel();

    var cpt = 0;
    for (e of p.shape.form.children)
	if (e.child.type != "rectangle" && e.child.events[1].mousedown)
	    cpt++;
    assert.equal(cpt, 4, "there must have 4 mousedown events defined on the panel");
});


/****************************place configuration**********************************/

QUnit.test("set the place's name", assert => {
    var p = new Place();

    assert.equal(p.name, null, "before setting the name, it's null");

    p.setName("p2");

    var child = p.shape.form.children[p.shape.form.children.length - 1].child;
    assert.ok(p.name, "name isn't null anymore");
    assert.equal(p.name, "p2", "name is correctly setted");
    assert.equal(child.type, 'text', "adding a new child to place, that is the name of the place");
    assert.equal(child.x, p.shape.form.x, "set abscissa");
    assert.equal(child.y, p.shape.form.y, "set ordinate");
    assert.equal(child.offsetX, -p.shape.form.r, "set offsetX");
    assert.equal(child.offsetY, p.shape.form.r + 20);
});


QUnit.test("set the place's type", assert => {
    var p = new Place();

    assert.equal(p.type, 'intermediary', "by default type is intermediary");

    p.setType('start');

    assert.equal(p.type, 'start', "type is correctly setted");
 });
