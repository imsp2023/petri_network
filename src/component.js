class Component{
    static config = {};
    static initSvgEvents(svg){
	svg.addEventListener("mousemove", (e)=>{
	    if(Event.line){
		Event.line.dest_x = e.clientX;
		Event.line.dest_y = e.clientY;
		Event.line.redraw();
	    }
	});

	svg.addEventListener("mouseup", (e)=>{
	    console.log('mouseUP SVG');
	    if(Event.line){
		Event.line.removeFromDOM();
		Event.line = null;
		Event.src = null;
		Event.state = null;
	    }
	});
    }

    addAllEvents() {
	this.comp.shape.addEvent('mouseover', (e)=>{
	    //this.onmouseover();
	    Event.onmouseover(this, transactions.list);
	});
	this.comp.shape.addEvent('mousedown', (e)=>{
	    Event.onmousedown(this)
	});
	this.comp.shape.addEvent('mouseleave', (e)=>{
	    Event.onmouseleave(this);
	});
	this.comp.shape.addEvent('mouseup', (e)=>{
	    Event.onmouseup(this);
	});
	this.comp.shape.addEvent('click', (e)=>{
	    Event.onclick(this);
	});
    }

    centerComponent(comp){
	comp.x += (layout.cellW-comp.width)/2;
        comp.y += (layout.cellH-comp.height)/2;
    }
    
    constructor(type, props){
	var lyt = {x: 0, y :0}, dim;
	
	if (!type || !props)
	    throw new Error("missing parameter");
	else if ((type != 'place' && type != 'edge' && type != 'transition') ||
		 typeof props != 'object')
	    throw new Error("wrong parameter");

	this.type = type;

	this.panelPos = -1;
	
	if(props.x >= 0 && props.y >= 0){
	    var lyt = layout.fixPoint(props.x, props.y);

	    props.x = lyt.x;
	    props.y = lyt.y;
	}else{
	    props.x = 0;
	    props.y = 0;

	}

	dim = Transition.getShapeDimension(this.type);
	dim.x = props.x;
	dim.y = props.y;
	
	this.centerComponent(dim);
	props.x = dim.x;
	props.y = dim.y;
	
	this.comp = Factory.getShape(type, props);
	if(this.comp == null)
	    throw new Error ("instantiation failed");
	if(type=='transition' || type == 'place')
	    layout.mark(Math.floor(lyt.x/layout.cellW),
                        Math.floor(lyt.y/layout.cellH),
                        this.comp.shape.uuid);

	
	this.addAllEvents();
	this.actions = transactions;
        Register.add(this.type == 'edge'?
		     this.comp.shape.line.uuid :
		     this.comp.shape.uuid, this);
	
    }

    move(dx, dy) {
	var edges = [];

	this.comp.shape.shift(dx, dy);
	this.comp.shape.redraw();

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
}
