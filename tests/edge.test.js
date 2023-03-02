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

QUnit.test("throws an exception when the specified end is null or isn't correct", assert => {
    assert.throws(
	function(){
	    new Edge("p2t", 1);
	},
	"wrong parameter"
    );
});

QUnit.test("edge has a line with an arrow as support shape", assert => {
    n_tab = 0;
    tab[0] = {
	comp: {
	    shape: {
		uuid: 1,
		type: 'place',
		form: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},
		    ]
		}
	    }
	}
    };
    tab[1] = {
	comp: {
	    shape: {
		uuid: 1,
		type: 'transition',
		form: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 50,
			    y: 30
			},
		    ]
		}
	    }
	}
    }

    var e = new Edge("p2t", 1, 2);
    assert.equal(e.shape.type, "link", "edge has a line as shape");
    assert.equal(e.shape.line.x, 10, "set x");
    assert.equal(e.shape.line.y, 30, "set y");
    assert.equal(e.shape.line.dest_x, 50, "set dest_x");
    assert.equal(e.shape.line.dest_y, 30, "set dest_y");
});

QUnit.test("throws an exception when the second end isn't correct", assert => {
    tab[0] = {uuid: 1};

    assert.throws(
	function(){
	    new Edge("p2t", 1, 2);
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


/******************************* panel of possible actions ****************************/
