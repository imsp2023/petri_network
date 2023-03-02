QUnit.module("Layout");



QUnit.test("cell and grid size is required for layout instanciation", assert =>{
    assert.throws(
	function() {
	    new Layout();
	},
	"wrong parameters"
    );
});

QUnit.test("instanciation of layout must determine the number of cells", assert =>{
    var l = new Layout(9, 10, 100, 102);

    assert.equal(l.ncols, 11, "number of colunms");
    assert.equal(l.nligs, 10, "number of lignes");
});


QUnit.test("instanciation of layout initialize grid with 0", assert =>{
    var l = new Layout(9, 10, 100, 102);

    assert.equal(l.grid.length, 110, "grid size");
    for(g of l.grid)
	assert.equal(g, 0, "grid item value");
});

QUnit.test("mark set a specific cell", assert =>{
    var l = new Layout(10, 10, 100, 100);
    l.mark(2, 2);
    assert.equal(l.grid[22], 1, "cell value");
});

QUnit.test("umark clears a specific cell", assert =>{
    var l = new Layout(10, 10, 100, 100);
    l.mark(1, 1);
    assert.equal(l.grid[11], 1, "cell value");
    
    l.umark(1, 1);
    assert.equal(l.grid[11], 0, "cell value");
    });

QUnit.test("clear unmarks all the cells", assert =>{
    var l = new Layout(10, 10, 100, 100), i, j;

    for(i = 0; i < l.nligs; i++)
	for(j = 0; j < l.ncols; j++)
	    l.mark(j, i);
    l.clear();

    for(g of l.grid)
	assert.equal(g, 0, "grid item value");
});

QUnit.test("getClosestPostion returns null when origin point is not provided", assert =>{
    var l = new Layout(10, 10, 40, 50);
    var r = l.getClosestPosition(); 
    
    assert.equal(r, null);
});

QUnit.test("getClosestPostion returns nullwhen origin is invalid", assert =>{
    var l = new Layout(10, 10, 40, 50);
    var r = l.getClosestPosition(4, -1); 
    
    assert.equal(r, null);
});

QUnit.test("in west orientation the first point is at west", assert =>{
    var l = new Layout(10, 10, 40, 40);
    var r = l.getClosestPosition(0, 1); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 1, "Y-axis");
});

QUnit.test("in west orientation the second point is at NW", assert =>{
    var l = new Layout(10, 10, 40, 40);

    l.clear();
    l.mark(0+space, 1);
    var r = l.getClosestPosition(0, 1); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 0, "Y-axis");
});

QUnit.test("in west orientation the third point is at SW", assert =>{
    var l = new Layout(10, 10, 40, 40);

    l.clear();
    l.mark(0+space, 1);
    l.mark(0+space, 0);

    var r = l.getClosestPosition(0, 1); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 2, "Y-axis");
});

QUnit.test("in west orientation the fourth point is below the third point", assert =>{
    var l = new Layout(10, 10, 40, 40);

    l.clear();
    l.mark(0+space, 1);
    l.mark(0+space, 0);
    l.mark(0+space, 2);

    var r = l.getClosestPosition(0, 1); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 3, "Y-axis");
});

//+++++

QUnit.test("in east orientation the first point is at east", assert =>{
    var l = new Layout(10, 10, 40, 40);
    var r = l.getClosestPosition(3, 1); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 1, "Y-axis");
});

QUnit.test("in east orientation the second point is at NE", assert =>{
    var l = new Layout(10, 10, 40, 40);

    l.clear();
    l.mark(3-space, 1);
    var r = l.getClosestPosition(3, 1); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 0, "Y-axis");
});

QUnit.test("in east orientation the third point is at SE", assert =>{
    var l = new Layout(10, 10, 40, 40);

    l.clear();
    l.mark(3-space, 1);
    l.mark(3-space, 0);

    var r = l.getClosestPosition(3, 1); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 2, "Y-axis");
});

QUnit.test("in west orientation getclosestpostion returns null when no position is available", assert =>{
    var l = new Layout(10, 10, 40, 40), i, j;

    l.clear();
    for(i = 0; i < l.nligs; i++)
	for(j = 0; j < l.ncols; j++)
	    l.mark(j, i);

    var r = l.getClosestPosition( 0, 1); 
    
    assert.equal(r, null);
});
