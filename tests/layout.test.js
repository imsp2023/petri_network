QUnit.module("Layout");



QUnit.test("cell and grid size is required for layout instanciation", assert =>{
    assert.notOk(layout.init(), "layout init parameters");
});

QUnit.test("instanciation of layout must determine the number of cells", assert =>{
    layout.init(9, 10, 100, 102);

    assert.equal(layout.ncols, 11, "number of colunms");
    assert.equal(layout.nligs, 10, "number of lignes");
});


QUnit.test("instanciation of layout initialize grid with 0", assert =>{
    layout.init(9, 10, 100, 102);

    assert.equal(layout.grid.length, 110, "grid size");
    for(g of layout.grid)
	assert.equal(g, 0, "grid item value");
});

QUnit.test("mark set a specific cell", assert =>{
    layout.init(10, 10, 100, 100);
    layout.mark(2, 2);
    assert.equal(layout.grid[22], 1, "cell value");
});

QUnit.test("umark clears a specific cell", assert =>{
    layout.init(10, 10, 100, 100);
    layout.mark(1, 1);
    assert.equal(layout.grid[11], 1, "cell value");
    
    layout.umark(1, 1);
    assert.equal(layout.grid[11], 0, "cell value");
    });

QUnit.test("clear unmarks all the cells", assert =>{
    var i, j;
    layout.init(10, 10, 100, 100);

    for(i = 0; i < layout.nligs; i++)
	for(j = 0; j < layout.ncols; j++)
	    layout.mark(j, i);
    layout.clear();

    for(g of layout.grid)
	assert.equal(g, 0, "grid item value");
});

QUnit.test("getClosestPostion returns null when origin point is not provided", assert =>{
    layout.init(10, 10, 40, 50);
    var r = layout.getClosestPosition(); 
    
    assert.equal(r, null);
});

QUnit.test("getClosestPostion returns nullwhen origin is invalid", assert =>{
    layout.init(10, 10, 40, 50);
    var r = layout.getClosestPosition(4, -1); 
    
    assert.equal(r, null);
});

QUnit.test("in west orientation the first point is at west", assert =>{
    layout.init(10, 10, 50, 50);
    var r = layout.getClosestPosition(0, 2); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 2, "Y-axis");
});

QUnit.test("in west orientation the second point is at NW", assert =>{
    layout.init(10, 10, 50, 50);

    layout.clear();
    layout.mark(0+space, 2);
    var r = layout.getClosestPosition(0, 2); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 0, "Y-axis");
});

QUnit.test("in west orientation the third point is at SW", assert =>{
    layout.init(10, 10, 50, 50);

    layout.clear();
    layout.mark(0+space, 2);
    layout.mark(0+space, 0);

    var r = layout.getClosestPosition(0, 2); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 4, "Y-axis");
});

QUnit.test("in west orientation the fourth point is below the third point", assert =>{
    layout.init(10, 10, 50, 70);

    layout.clear();
    layout.mark(0+space, 2);
    layout.mark(0+space, 4);
    layout.mark(0+space, 0);

    var r = layout.getClosestPosition(0, 2); 
    
    assert.equal(r.x, 0+space, "X-axis");
    assert.equal(r.y, 6, "Y-axis");
});

//+++++

QUnit.test("in east orientation the first point is at east", assert =>{
    layout.init(10, 10, 40, 50);
    var r = layout.getClosestPosition(3, 2); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 2, "Y-axis");
});

QUnit.test("in east orientation the second point is at NE", assert =>{
    layout.init(10, 10, 40, 50);

    layout.clear();
    layout.mark(3-space, 2);
    var r = layout.getClosestPosition(3, 2); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 0, "Y-axis");
});

QUnit.test("in east orientation the third point is at SE", assert =>{
    layout.init(10, 10, 40, 50);

    layout.clear();
    layout.mark(3-space, 2);
    layout.mark(3-space, 0);

    var r = layout.getClosestPosition(3, 2); 
    
    assert.equal(r.x, 3-space, "X-axis");
    assert.equal(r.y, 4, "Y-axis");
});

QUnit.test("in west orientation getclosestpostion returns null when no position is available", assert =>{
    var i, j;
    layout.init(10, 10, 40, 40);

    layout.clear();
    for(i = 0; i < layout.nligs; i++)
	for(j = 0; j < layout.ncols; j++)
	    layout.mark(j, i);

    var r = layout.getClosestPosition( 0, 1); 
    
    assert.equal(r, null);
});
/**************** markedge *******************/
QUnit.test("markEdge marks 2 cells when position is located at west", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(0, 2, 2, 2);
    assert.equal(layout.grid[11], 1, "mark");
    assert.equal(layout.grid[12], 1, "mark");
});


QUnit.test("markEdge marks 2 cells when position is located at NW", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(0, 2, 2, 0);
    assert.equal(layout.grid[0], 1, "mark");
    assert.equal(layout.grid[5], 1, "mark");

    assert.equal(layout.grid[1], 1, "mark");
    assert.equal(layout.grid[2], 1, "mark");

});


QUnit.test("markEdge marks 2 cells when position is located at SW", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(0, 2, 2, 4);
    assert.equal(layout.grid[15], 1, "mark");
    assert.equal(layout.grid[20], 1, "mark");
    
    assert.equal(layout.grid[21], 1, "mark");
    assert.equal(layout.grid[22], 1, "mark");
    
});

QUnit.test("markEdge marks 2 cells when position is located at east", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(4, 2, 2, 2);
    assert.equal(layout.grid[12], 1, "mark");
    assert.equal(layout.grid[13], 1, "mark");
});

QUnit.test("markEdge marks 2 cells when position is located at NE", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(4, 2, 2, 0);

    assert.equal(layout.grid[4], 1, "mark");
    assert.equal(layout.grid[9], 1, "mark");
    
    assert.equal(layout.grid[2], 1, "mark");
    assert.equal(layout.grid[3], 1, "mark");
    
});


QUnit.test("markEdge marks 2 cells when position is located at SE", assert =>{
    var i, j;
    layout.init(10, 10, 50, 50);
    layout.clear();
    layout.markEdge(4, 2, 2, 4);
    assert.equal(layout.grid[19], 1, "mark");
    assert.equal(layout.grid[24], 1, "mark");
    
    assert.equal(layout.grid[22], 1, "mark");
    assert.equal(layout.grid[23], 1, "mark");
    
});
