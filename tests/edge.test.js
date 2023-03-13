QUnit.module("Edge");

/************************ Visual representation of edges ********************/
QUnit.test("throws an exception when no parameter", assert => {

    assert.throws(
	function(){
	    new Edge();
	},
	"missing parameters"
    );
});

QUnit.test("throws an exception when no source)", assert => {

    assert.throws(
	function(){
	    new Edge({});
	},
	"missing parameters"
    );
});

QUnit.test("throws an exception when no destination", assert => {
    assert.throws(
	function(){
	    new Edge({src:'foo'});
	},
	"wrong direction"
    );
});

QUnit.test("throws an exception when no direction", assert => {
    assert.throws(
	function(){
	    new Edge({src:'foo', dest: 'bar'});
	},
	"wrong direction"
    );
});

QUnit.test("throws an exception when wrong src", assert => {
    n_tab = 0;
    assert.throws(
	function(){
	    new Edge({src:'foo', dest: 'bar', direction:'p2t'});
	},
	"wrong direction"
    );
});

QUnit.test("throws an exception when wrong dest", assert => {
    n_tab = 0;
    tab[0] = {
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
    };
    assert.throws(
	function(){
	    new Edge({src:'foo', dest: 'bar', direction:'p2t'});
	},
	"wrong direction"
    );
});


QUnit.test("throws an exception when wrong direction", assert => {
    assert.throws(
	function(){
	    new Edge({src:'foo', dest: 'bar', direction:''});
	},
	"wrong direction"
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
			}
		    ]
		}
	    }
	}};
	tab[1] ={
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
			}
		    ]
		}
	    }
	}};

    var e = new Edge({src:'foo', dest: 'bar', direction:'p2t'});
    assert.equal(e.shape.type, "link", "component type");
    assert.equal(e.shape.line.x, 10, "set x");
    assert.equal(e.shape.line.y, 30, "set y");
    assert.equal(e.shape.line.dest_x, 50, "set dest_x");
    assert.equal(e.shape.line.dest_y, 30, "set dest_y");
});


// /******************************* panel of possible actions ****************************/
