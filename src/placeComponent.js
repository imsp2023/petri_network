class PlaceComponent{
    addAllEvents() {
	this.comp.shape.shape.addEvent('mouseover', (e)=>{

	    Event.onmouseover(this, placactions.list,
			      this.comp.shape.shape.x + this.comp.shape.shape.r,
			      this.comp.shape.shape.y - this.comp.shape.shape.r);
	});
	this.comp.shape.shape.addEvent('mousedown', (e)=>{
	    Event.onmousedown(this)
	    layout.umark(Math.floor(this.comp.shape.shape.x/layout.cellW),
			 Math.floor(this.comp.shape.shape.y/layout.cellH));
	});
	this.comp.shape.shape.addEvent('mouseleave', (e)=>{
	    Event.onmouseleave(this);
	});
	this.comp.shape.shape.addEvent('mouseup', (e)=>{
	    Event.onmouseup(this);
	});
	this.comp.shape.shape.addEvent('click', (e)=>{
	    Event.onclick(this);
	});
    }

    centerComponent(comp){
	comp.x += layout.cellW/2;
        comp.y += layout.cellH/2;
    }
    
    constructor(props){
	var lyt = {x: 0, y :0}, dim;
	
	this.type = 'place';
	this.panelPos = -1;
	
	if(props.x >= 0 && props.y >= 0){
	    var lyt = layout.fixPoint(props.x, props.y);

	    props.x = lyt.x;
	    props.y = lyt.y;
	}else{
	    props.x = 0;
	    props.y = 0;

	}

	this.centerComponent(props);
	this.comp = new Place(props);

	layout.mark(Math.floor(lyt.x/layout.cellW),
                    Math.floor(lyt.y/layout.cellH),
                    this.comp.shape.shape.uuid);

	
	this.addAllEvents();
	this.actions = placactions;
        Register.add(this.comp.shape.uuid, this);
	
    }

    move(dx, dy) {
	var edges = [];

	layout.umark(Math.floor(this.comp.shape.shape.x/layout.cellW),
		     Math.floor(this.comp.shape.shape.y/layout.cellH));
	
	this.comp.shape.shape.shift(dx, dy);

	layout.mark(Math.floor(this.comp.shape.shape.x/layout.cellW),
		    Math.floor(this.comp.shape.shape.y/layout.cellH),
		    this.comp.shape.shape.uuid);
	this.comp.redraw();
	Register.forEach(
	    (item, data)=>{
		if(item.type=='edge' &&
		   (item.comp.src == this.comp.shape.uuid ||
		    item.comp.dest == this.comp.shape.uuid))
		    data.push(item);
	    },
	    edges
	);

	edges.map((e)=>{
	    e.comp.redraw();
	});
    }
    
    save(){
	var obj = {};
	Object.keys(this.comp.shape).map((e)=>{
	    if(e != 'shape')
		obj[e] = this.comp[e];
	    else {
		obj.uuid = this.comp[e].shape.uuid
		obj.x = this.comp[e].shape.x;
		obj.y = this.comp[e].shape.y;
	    }
	});

	return obj;
    }

    remove(){
	layout.umark(Math.floor(this.comp.shape.shape.x/layout.cellW),
		     Math.floor(this.comp.shape.shape.y/layout.cellH));
	this.comp.shape.shape.removeFromDOM();
        Register.clear(this.comp.shape.uuid);
    }

}
