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

QUnit.test("edge accepts ca as direction)", assert => {

    var e = new Edge({direction: 'ca'});
	assert.equal(e.type, "edge", "component type");
    assert.equal(e.direction, "ca", "component direction");
});

QUnit.test("edge accepts p2t as direction)", assert => {

    var e = new Edge({direction: 'p2t'});
	assert.equal(e.type, "edge", "component type");
    assert.equal(e.direction, "p2t", "component direction");
});

QUnit.test("edge accepts t2p as direction)", assert => {

    var e = new Edge({direction: 'p2t'});
	assert.equal(e.type, "edge", "component type");
    assert.equal(e.direction, "t2p", "component direction");
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
    tab[0] = null;
    tab[1] = null;
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
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			}
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

QUnit.test("edge throws an exception when p2t link is use with components of the same type)", assert => {

    assert.throws(
	function(){
	    var e = new Edge({direction: 'p2t', src: 1, dest: 2});
	},
	"missing parameters"
    );
});

QUnit.test("edge throws an exception when t2p link is use with components of the same type)", assert => {
n_tab = 0;
    tab[0] = {
	comp: {
	    shape: {
		uuid: 1,
		type: 'place',
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
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
		type: 'place',
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			}
		    ]
		}
	    }
	}};
    assert.throws(
	function(){
	    var e = new Edge({direction: 't2p', src: 1, dest: 2});
	},
	"missing parameters"
    );
});


QUnit.test("throws an exception when wrong direction", assert => {
    n_tab = 0;
    tab[0] = {
	comp: {
	    shape: {
		uuid: 1,
		type: 'transition',
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
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
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			}
		    ]
		}
	    }
	}};
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
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
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
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
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

QUnit.test("ca link do not complain when components have the same type", assert => {
    n_tab = 0;
    tab[0] = {
	comp: {
	    shape: {
		uuid: 1,
		type: 'transition',
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
			    x: 10,
			    y: 30
			},	{
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
		shape: {
		    x: 10,
		    y: 30,
		    c_points: [
			{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			},{
			    x: 50,
			    y: 30
			}
		    ]
		}
	    }
	}};

    var e = new Edge({src:'foo', dest: 'bar', direction:'ca'});
    assert.equal(e.direction, "ca", "component direction");
    assert.equal(e.shape.type, "link", "component type");
    });


// /******************************* panel of possible actions ****************************/
