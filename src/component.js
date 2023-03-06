class Component{
    static line = null;
    static src = null;
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
	    
	this.comp = Factory.getShape(type, props);
	if(this.comp == null)
	    throw new Error ("instantiation failed");
	
	Register.add(this);
    }
    edgeCompleted(target){
	var found;
	if(!Component.line)
	    return;

	if(!(found=Register.find(target)))
	    return;

	Component.line.removeFromDOM();

	if(Component.src.type != found.type){
	    new Component('edge', {
		direction:found.type=='place'?'t2p':'p2t',
		src: Component.src.comp.shape.uuid,
		dest: found.comp.shape.uuid
	    });
	    layout.markEdge(/* to be completed with line ends */);
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
	    var props = {}, tr, pos, edge, step, i;

	    if(type == 'place')
		props.type = 'intermediary';
	    else
		props.type = 'dummy'

	    /* TODO: genereate name*/
	    props.name = 'generate automatic name';

	    if((pos=layout.getClosestPosition(this.comp.shape.form.x, this.comp.shape.form.y))){
		props.x = pos.x*layout.cellW;
		props.y = pos.y*layout.cellH;
	    }else{
		props.x = 0;
		props.y = 0;
	    }
	    
	    layout.markEdge(this.comp.shape.form.x, this.comp.shape.form.y,
			    pos.x, pos.y);
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
