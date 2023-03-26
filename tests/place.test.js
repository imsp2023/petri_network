QUnit.module("Place");

QUnit.test("The default type of a place is intermediary", assert => {
    var p = new Place();
    assert.equal(p.type, "intermediary", "place type");
    assert.ok(p.name, "place name");
});

QUnit.test("the argument of place component must be an object when provided", assert =>{
      assert.throws(
	function() {
	    new place("asub");
	},
	"wrong parameter"
    );
});

QUnit.test("The type of a place is intermediary when not provided", assert => {
    var p = new Place({});
    assert.equal(p.type, "intermediary", "place type");
});

QUnit.test("The name is generated when not provided", assert => {
    var p = new Place({});
    assert.ok(p.name, "place name");
});

QUnit.test("The type of a place can be start", assert => {
    var p = new Place({type: 'start'});
    assert.equal(p.type, "start", "place type");
});

QUnit.test("The type of a place can be intermediary", assert => {
    var p = new Place({type: 'intermediary'});
    assert.equal(p.type, "intermediary", "place type");
});

QUnit.test("The type of a place can be end", assert => {
    var p = new Place({type: 'end'});
    assert.equal(p.type, "end", "place type");
});

QUnit.test("place must be defined with specific type and name", assert => {
    var p = new Place({type: 'start', name: 'foobar'});
    assert.equal(p.type, "start", "place type");
    assert.equal(p.name, "foobar", "place name");
});



/* TODO: make c_points and vertex invisible 
   ****
*/

QUnit.test("the basic shape of a place must be a circle", assert => {
    aya.settype("cir");

    assert.throws(
	function() {
	    new Place()
	},
	"the shape isn't a circle"
    );
    aya.settype(null);
});

QUnit.test("Visual representation of a place", assert =>{
    var  p = new Place();

    assert.equal(p.shape.shape.r, Place.Radius, "the radius must be 10 px");
    assert.equal(p.shape.shape.fill, "white", "the color must be black");
    assert.equal(p.shape.shape["stroke-width"], Place.IStroke, "the border width must  be 3 px");
    assert.equal(p.shape.shape["stroke"], "black");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
});

QUnit.test("Start place has a green circle", assert => {
    var p = new Place({type: "start"});

    assert.equal(p.type, "start", "the type of the place is 'start'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.shape.fill, "white", "the color must be 'green'");
    assert.equal(p.shape.shape["stroke"], Place.SColor, "border color must be green");
    assert.equal(p.shape.shape["stroke-width"], Place.SStroke, "the border width must  be 3 px");
});

QUnit.test("Intermediary place has a black circle", assert => {
    var p = new Place({type: "intermediary"});

    assert.equal(p.type, "intermediary", "the type of the place is 'intermediary'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.shape.fill, "white", "the color must be 'white'");
    assert.equal(p.shape.shape["stroke"], Place.IColor, "border color must be 'black'");
    assert.equal(p.shape.shape["stroke-width"], Place.IStroke, "the border width must  be 3 px");
});

QUnit.test("End place has a red circle", assert => {
    var p = new Place({type: "end"});

    assert.equal(p.type, "end", "place type");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.shape.fill, "white", "the color must be 'white'");
    assert.equal(p.shape.shape["stroke"], Place.EColor, "border color must be 'red'");
    assert.equal(p.shape.shape["stroke-width"], Place.EStroke, "the border width must  be 3 px");
						   });

QUnit.test("throws an exception with wrong type", assert => {
    assert.throws(
	function(){
	    new Place({type: "wrong"});
	},
	"the type is wrong"
    );
});

QUnit.test("default position is (0, 0) when not provided", assert => {
    var p = new Place({});

    assert.equal(p.shape.shape.x, 0, "x-axis");
    assert.equal(p.shape.shape.y, 0, "-axis");
});

QUnit.test("Ajust place position when cell size is provided", assert => {
    var p = new Place({cWidth: 40, cHeight: 60});

    assert.equal(p.shape.shape.x, 20, "x-axis");
    assert.equal(p.shape.shape.y, 30, "-axis");
});

/**********************panel of possible action************************/

QUnit.test("Ensure that  we define an hover event on the Place with addPanel() as callback", assert => {
    var p = new Place({type: "start"});
    var ev = null;
    for (e of p.shape.events)
	if (e["mouseover"])
	    ev = e;
    assert.ok(ev, "mouseover event is defined");
});


QUnit.test("addPanel() opens an empty panel when we hover over a place", assert => {
    var p = new Place({});
    p.addPanel();

    assert.ok(p.shape.shape.children.length, "the shape has a child");
    assert.equal(p.shape.shape.children[0].child.type, "rectangle", "panel has a rectangle as support");
    assert.equal(p.shape.shape.children[0].child.shape["stroke-width"], "0px", "the border width must  be 2 px");
    assert.equal(p.shape.shape.children[0].child.shape["opacity"], 0, "panel opacity");
});

QUnit.test("panel must cover the place", assert => {
    var p = new Place();

    p.addPanel();

    assert.ok(p.shape.shape.children.length, "the shape has a child");
    assert.equal(p.shape.shape.children[0].child.type, "rectangle", "panel has a rectangle as support");
    assert.equal(p.shape.shape.children[0].child.offsetX, -10, "panel offsetX");
    assert.equal(p.shape.shape.children[0].child.offsetY, 0, "panel offsetY");

});

QUnit.test("add all actions on the panel when we hover over it", assert => {
    var p = new Place({});
    p.addPanel();

    assert.equal(p.shape.shape.children.length,
		 1+Place.actions.length, "children count");
    p.shape.shape.children.map(({child}, index) => {
	if (index != 0){
	    assert.equal(child.type, "image", "child type");
	    assert.equal(child.width, Place.ImgSZ, "image width");
	    assert.equal(child.height, Place.ImgSZ, "image height");
	    assert.equal(child.path, Place.actions[index -1].path, "image path");
	}
    });
});

QUnit.test("addpanel a mouseover on the images", assert => {
    var p = new Place();
    var cpt = 0;
    
    p.addPanel();
    p.shape.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseover"])
		    cpt++;
	}
    });

    assert.equal(cpt, Place.actions.length, "mouseover count");
});

QUnit.test("addpanel a mouseleave on the images", assert => {
    var p = new Place();
    var cpt = 0;
    
    p.addPanel();
    p.shape.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseleave"])
		    cpt++;
	}
    });
    assert.equal(cpt, Place.actions.length, "mouseleave count");
});

QUnit.test("addpanel a mousedown on the images", assert => {
    var p = new Place();
    var cpt = 0;

    p.addPanel();
    p.shape.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mousedown"])
		    cpt++;
	}
    });
    assert.equal(cpt, Place.actions.length, "mousedown count");
});

QUnit.test("actions are display on two columns", assert => {
    var p = new Place();

    p.addPanel();
    p.shape.shape.children.map(({child}, index) => {
	if (index != 0){
	    assert.equal((child.x+Place.Radius)+Place.ImgSZ,
			 2*Place.Radius+(index%2)==0?Place.ImgSZ:0,
			 "X-axis");
	    assert.equal(child.y,
			 (Place.ImgSZ+5)*(1-Math.ceil(index/2)),
			 "Y-axis");
	    assert.equal(child.offsetX, 5, "setting offsetX");
	    assert.equal(child.offsetY, 0, "setting offsetY");
	}
    });
});

QUnit.test("add mouseleave event on panel", assert => {
    var p = new Place();

    p.addPanel();

    var ev = null;
    for (e of p.shape.shape.children[0].child.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the rectangle child");
});


QUnit.test("add mouseleave event on place", assert => {
    var p = new Place();
    var ev = null;
    
    p.addPanel();
    for (e of p.shape.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the place");
});

QUnit.test("add mouseup event on place in order to add an edge", assert => {
    var p = new Place();
    var ev = null;
    for (e of p.shape.events)
	if (e["mouseup"])
	    ev = e;
    assert.ok(ev, "mouseup event is defined on the place");
});

QUnit.test("add mousedown event on place", assert => {
    var p = new Place();

    var ev = null;
    for (e of p.shape.events)
	if (e["mousedown"])
	    ev = e;
    assert.ok(ev, "mousedown event");
});
