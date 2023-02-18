QUnit.module("Edge");

/************************ Visual representation of edges ********************/
QUnit.test("the creation of an edge requires at least 2 parameters (in case nothing is provided)", assert => {

    assert.throws(
	function(){
	    new Edge();
	},
	"missing parameters"
    );
});

QUnit.test("the creation of an edge requires at least 2 parameters (in case only one is provided)", assert => {

    assert.throws(
	function(){
	    new Edge("p2t");
	},
	"missing parameters"
    );
});

QUnit.test("throws an exception when direction type isn't correct", assert => {
    assert.throws(
	function(){
	    new Edge("blabla", null);
	},
	"wrong direction"
    );
});

QUnit.test("throws an exception when the specified end is null", assert => {
    assert.throws(
	function(){
	    new Edge("p2t", null);
	},
	"wrong parameter"
    );
});

QUnit.test("throws an exception when the specified end isn't correct", assert => {
    assert.throws(
	function(){
	    new Edge("p2t", {});
	},
	"wrong parameter"
    );
});

QUnit.test("edge has a line with an arrow as support shape", assert => {
    var e = new Edge("p2t",
		     {
			 shape:
			 {
			     form:{
				 c_points: [
				     {
					 x: 10,
					 y: 30
				     },
				 ],
				 c_svg: {
				 }
			     }
			 }
		     });
    assert.equal(e.shape.type, "line", "edge has a line as shape");
    assert.equal(e.shape.form.x, 10, "set x");
    assert.equal(e.shape.form.y, 30, "set y");
    assert.equal(e.shape.form.dest_x, 50, "set dest_x");
    assert.equal(e.shape.form.dest_y, 30, "set dest_y");
});


QUnit.test("throws an exception when the second end isn't correct", assert => {
    assert.throws(
	function(){
	    new Edge("p2t", {shape : {type: "place"}}, {});
	},
	"wrong parameter"
    );
});


QUnit.test("check that a link between two places or two transitions are forbidden", assert => {
    assert.throws(
	function(){
	    new Edge("p2t",
		     {
			 shape : {
			     form: {
				 c_svg: {}
			     },
			     type: "place"
			 }
		     },
		     {
			 shape : {
			     form: {
				 c_svg: {}
			     },
			     type: "place"
			 }
		     });
	},
	"link between two places is forbidden"
    );

    assert.throws(
	function(){
	    new Edge("p2t",
		     {
			 shape : {
			     form: {
				 c_svg: {}
			     },
			     type: "transition"
			 }
		     },
		     {
			 shape : {
			     form: {
				 c_svg: {}
			     },
			     type: "transition"
			 }
		     });
	},
	"link between two transitions is forbidden"
    );
});

/*
QUnit.test("an edge of type p2t is drawn from the place to the transition", assert => {

});

QUnit.test("an edge of type t2p is drawn from the transition to the place", assert => {

});
*/


/* call a method to specify the second end of the edge */



/******************************* panel of possible actions ****************************/

