class Component{
    static line = null;
    static src = null;
    static initSvgEvents(svg){
	svg.addEventListener("mousemove", (e)=>{
	    if(Component.line){
		Component.line.dest_x = e.clientX;
		Component.line.dest_y = e.clientY;
		Component.line.redraw();
	    }
	});

	svg.addEventListener("mouseup", (e)=>{
	    if(Component.line){
		Component.line.removeFromDOM();
		Component.line = null;
		Component.src = null;
	    }
	});
    }
    constructor(type, props){

	if (!type || !props)
	    throw new Error("missing parameter");
	else if ((type != 'place' && type != 'edge' && type != 'transition') ||
		 typeof props != 'object')
	    throw new Error("wrong parameter");

	this.type = type;

	if(props.x >= 0 && props.y >= 0){
	    var lyt = layout.fixPoint(props.x, props.y);
	    props.x = lyt.x;
	    props.y = lyt.y;
	}else{
	    props.x = 0;
	    props.y = 0;
	}

	props.cWidth = layout.cellW;
	props.cHeight = layout.cellH;
	this.comp = Factory.getShape(type, props);
	if(this.comp == null)
	    throw new Error ("instantiation failed");
	
	Register.add(this);
    }
    edgeCompleted(target){
	var found;
	console.log('edgecompleted');
	if(!Component.line)
	    return;

	console.log('edgecompleted3');
	Component.line.removeFromDOM();

	if(Component.src.type != this.type){
	    console.log('edgecompleted4');
	    new Component('edge', {
		direction:this.type=='place'?'t2p':'p2t',
		src: Component.src.comp.shape.uuid,
		dest: this.comp.shape.uuid
	    });
	    layout.markEdge(Component.src.comp.shape.form.x,
			    Component.src.comp.shape.form.y,
			    this.comp.shape.form.x, this.comp.shape.form.y);
	}
	
	Component.line = null;
	Component.src = null;
    }
    
    addConnector(type){
	this.comp.removePanel();
	if(type == this.type)
	    return;
	
	if(type == 'edge'){
	    Component.src = this;
	    Component.line = aya.Line(this.comp.shape.form.c_points[0].x, this.comp.shape.form.c_points[0].y);
	    Component.line.draw();
	    
	}else if(type == 'transition' || type == 'place'){
	    var props = {}, tr, pos, edge, step, i, posx, posy;

	    if(type == 'place')
		props.type = 'intermediary';
	    else
		props.type = 'dummy'

	    /* TODO: genereate name*/
	    props.name = 'generate automatic name';
	    console.log('addconnector');

	    posx = Math.floor(this.comp.shape.form.x/layout.cellW);
	    posy = Math.floor(this.comp.shape.form.y/layout.cellH);
	    if((pos=layout.getClosestPosition(posx, posy))){
		props.x = pos.x*layout.cellW;
		props.y = pos.y*layout.cellH;
	    }else{
		props.x = 0;
		props.y = 0;

		pos.x = 0;
		pos.y = 0;
	    }

	    props.cWidth = layout.cellW;
	    props.cheight = layout.cellH;
	    
	    layout.markEdge(posx, posy, pos.x, pos.y);

	    tr = new Component(type, props);
	    edge =  new Component('edge', {
		direction: type=='transition'? 'p2t': 't2p',
		src: this.comp.shape.uuid,
		dest: tr.comp.shape.uuid
	    });
	}
	else if(type == 'deletion'){
	    var edges = Register.findAllEdges(this.comp.shape.uuid);

	    edges.map((lk) => {
		lk.comp.shape.line.removeFromDOM();
		Register.clear(lk.comp.shape.line.uuid);
	    });
	    this.comp.shape.form.c_points.map((pt)=>{
		pt.removeFromDOM();
	    });
	    this.comp.shape.form.children.map(({child}) => {
		child.removeFromDOM();
	    });
	    this.comp.shape.form.svg.removeChild(this.comp.shape.form.c_svg);
	    Register.clear(this.comp.shape.uuid);
	}
	else if (type == 'setting'){
	    var name = window.prompt("Name of the place :");
	    this.comp.setName(name);
	    var type = window.prompt("Type of the place :");
	    this.comp.setType(type);
	}
    }
}
