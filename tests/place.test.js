QUnit.module("Place");

QUnit.test("Default circle representation of a place", assert =>{
    var  p = new Place();

    assert.equal(p.shape.form.r, 25, "the radius must be 10 px");
    assert.equal(p.shape.form.fill, "black", "the color must be black");
    assert.equal(p.shape.form["stroke-width"], "2px", "the border width must  be 2 px");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
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
    assert.equal(p.shape.form.fill, "green", "the color must be 'green'");
});


QUnit.test("Check that the creation of a intermediary place has a black circle", assert => {
    var p = new Place("intermediary");

    assert.equal(p.type, "intermediary", "the type of the place is 'intermediary'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.fill, "black", "the color must be 'black'");
});

QUnit.test("Check that the creation of a end place has a red circle", assert => {
    var p = new Place("end");

    assert.equal(p.type, "end", "the type of the place is 'end'");
    assert.equal(p.shape.type, "circle", "the shape is a circle");
    assert.equal(p.shape.form.fill, "red", "the color must be 'red'");
});

QUnit.test("Checking that a wrong type throws an exception", assert => {
    assert.throws(
	function(){
	    new Place("wrong");
	},
	"the type is wrong"
    );
});
