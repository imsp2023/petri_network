QUnit.module("Panel");

/************************************** actions panel ***********************************/

// QUnit.test("Ensure that  we define an hover event on the Component with addPanel() as callback", assert => {
//     var t = new Component();
//     var ev = null;
//     for (e of t.shape.events)
// 	if (e["mouseover"])
// 	    ev = e;
//     assert.ok(ev, "mouseover event is defined");
// });


QUnit.test("addPanel() opens an empty panel when we hover over a Component", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    assert.ok(t.comp.shape.children.length, "the shape has a child");
    assert.equal(t.comp.shape.children[0].child.type, "rectangle", "panel has a rectangle as support");

    assert.equal(t.comp.shape.children[0].child.x, t.comp.shape.x+t.comp.shape.width, "panel x-absc");
    assert.equal(t.comp.shape.children[0].child.y, t.comp.shape.y, "panel y-absc");
    
    assert.equal(t.comp.shape.children[0].child.width,  2*ImSZ+2*5, "panel width");
    assert.equal(t.comp.shape.children[0].child.height, 3*ImSZ+ 3*5, "panel height");
    
    assert.equal(t.comp.shape.children[0].child.shape["stroke-width"], "0px", "the border width must  be 2 px");
    assert.equal(t.comp.shape.children[0].child.shape["opacity"], 0, "panel opacity");
});

QUnit.test("panel must cover the Component", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    assert.ok(t.comp.shape.children.length, "the shape has a child");
    assert.equal(t.comp.shape.children[0].child.type, "rectangle", "panel has a rectangle as support");
    assert.equal(t.comp.shape.children[0].child.offsetX, -2, "panel offsetX");
    assert.equal(t.comp.shape.children[0].child.offsetY, 0, "panel offsetY");

});


QUnit.test("add all actions on the panel when we hover over it", assert => {
    var t = new Component('transition', {});

    t.addPanel();


    assert.equal(t.comp.shape.children.length, actions.transition.length+1, "Component children ");
    t.comp.shape.children.map(({child}, index) => {
	if (index != 0){
	    assert.equal(child.type, "image", "children are images");
	    assert.equal(child.width, ImSZ, "the width of the child must be 30 px");
	    assert.equal(child.height, ImSZ, "the height of the child must be 30 px");
	    assert.equal(child.path, actions.transition[index - 1].path, "check the correct path of each image");
	}
    });
});

QUnit.test("addpanel a mouseover on the images", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    var cpt = 0;
    t.comp.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseover"])
		    cpt++;
	}
    });

    assert.equal(cpt, actions.transition.length, "mouseover count");
});

QUnit.test("addpanel a mouseleave on the images", assert => {
    var t = new Component('transition', {});
    var cpt = 0;
    
    t.addPanel();
    t.comp.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mouseleave"])
		    cpt++;
	}
    });
    assert.equal(cpt, actions.transition.length, "mouseleave count");
});

QUnit.test("addpanel a mousedown on the images", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    var cpt = 0;

    t.comp.shape.children.map(({child}, index) => {
	if (index != 0){
	    for (e of child.events)
		if (e["mousedown"])
		    cpt++;
	}
    });
    assert.equal(cpt, actions.transition.length, "mousedown count");
});



QUnit.test("actions are display on three columns", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    assert.equal(t.comp.shape.children[1].child.x, 0, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[1].child.y, 0, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[1].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[1].child.offsetY, 0, "setting offsetY");

    assert.equal(t.comp.shape.children[2].child.x, 22, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[2].child.y, 0, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[2].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[2].child.offsetY, 0, "setting offsetY");

    assert.equal(t.comp.shape.children[3].child.x, 44, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[3].child.y, 0, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[3].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[3].child.offsetY, 0, "setting offsetY");

    assert.equal(t.comp.shape.children[4].child.x, 0, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[4].child.y, 27, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[4].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[4].child.offsetY, 0, "setting offsetY");

    assert.equal(t.comp.shape.children[5].child.x, 22, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[5].child.y, 27, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[5].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[5].child.offsetY, 0, "setting offsetY");

    assert.equal(t.comp.shape.children[6].child.x, 44, "setting the abscissa of the child");
	assert.equal(t.comp.shape.children[6].child.y, 27, "setting the ordinate of the child");
	assert.equal(t.comp.shape.children[6].child.offsetX, 5, "setting offsetX");
	assert.equal(t.comp.shape.children[6].child.offsetY, 0, "setting offsetY");

});


QUnit.test("add mouseleave event on panel", assert => {
    var t = new Component('transition', {});

    t.addPanel();

    var ev = null;
    for (e of t.comp.shape.children[0].child.events)
	if (e["mouseleave"])
	    ev = e;
    assert.ok(ev, "mouseleave event is defined on the rectangle child");
});

// QUnit.test("panel must stay opened when mouse is moving from Component to panel", assert => {
//     var t = new Component('transition', {});

//     t.addPanel();

//     var cpt = 0;
//     for (e of t.comp.shape.events)
// 	if (e["mouseover"])
// 	    cpt++;
//     assert.equal(cpt, 1, "there must have 1 mousever event defined on the Component");
// });


/*****************************************************************************************/
