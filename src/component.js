class Component{
    static line = null;
    static src = null;
    static state = null;
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
	if(type=='transition' || type == 'place')
	    layout.mark(Math.floor(props.x/layout.cellW), Math.floor(props.y/layout.cellH));
	Register.add(this.type == 'edge'?
		     this.comp.shape.line.uuid :
		     this.comp.shape.uuid, this);
    }
    edgeCompleted(){
	if(!Component.line)
	    return;
	console.log('completed type='+this.type+ ' x2='+ this.comp.shape.form.x);
	Component.line.removeFromDOM();

	if(Component.src.type != this.type){
	    
	    new Component('edge', {
		direction:this.type=='place'?'t2p':'p2t',
		src: Component.src.comp.shape.uuid,
		dest: this.comp.shape.uuid
	    });
	    layout.markEdge(Component.src.comp.shape.form.x/layout.cellW,
			    Component.src.comp.shape.form.y/layout.cellH,
			    this.comp.shape.form.x/layout.cellW,
			    this.comp.shape.form.y/layout.cellH);
	}
	
	Component.line = null;
	Component.src = null;
	Component.state = null;
    }
    
    addConnector(type){
	this.comp.removePanel();
	if(type == this.type)
	    return;
	
	if(type == 'edge'){
	    Component.state = 'linking'
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
	    edge = new Component('edge', {
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

    onMouseDown(){
	Component.state = 'moving';
	Component.x = this.comp.shape.form.x;
	Component.y = this.comp.shape.form.y;
    }

    onMouseUp(uuid){
	console.log('mouseUp state='+Component.state);
	if(Component.state == 'linking')
	    this.edgeCompleted(uuid);
	else if(Component.state == 'moving'){
	    var lyt = layout.fixPoint(this.comp.shape.form.x,
				      this.comp.shape.form.y);
	    var edges = [], src, dest, osrc, odest;
	    this.comp.shape.form.x = lyt.x;
	    this.comp.shape.form.y = lyt.y;
	    this.comp.shape.form.redraw();
	    Register.forEach(
		(item)=>{
		    if(item.type=='edge' &&
		       (item.src == this.comp.shape.uuid ||
			item.dest == this.comp.shape.uuid))
			edges.push(item);
		},
		edges);
	    console.log('mouseUp edges='+edges);
	    if(!edges.length){
		layout.umark(Math.floor(Component.x/layout.cellW),
			     Math.floor(Component.y/layout.cellH));
		layout.mark(lyt.x/layout.cellW,  lyt.y/layout.cellH);
	    }else{
		edges.map((e)=>{
		    if(e.src == this.comp.shape.uuid){
			dest = Register.find(e.dest);
			odest = {
			    x: dest.comp.shape.form.x,
			    y: dest.comp.shape.form.y
			};
			src = this;
			osrc = {
			    x: Component.x,
			    y: Component.y
			};
		    }
		    else{
			src = Register.find(e.src);
			osrc = {
			    x: src.comp.shape.form.x,
			    y: src.comp.shape.form.y
			};
			
			dest = this;
			odest = {
			    x: Component.x,
			    y: Component.y
			};
		    }
		    
		    layout.umarkEdge(Math.floor(osrc.x/layout.cellW),
				     Math.floor(osrc.y/layout.cellH),
				     Math.floor(odest.x/layout.cellW),
				     Math.floor(odest.y/layout.cellH));

		    layout.markEdge(Math.floor(src.comp.shape.form.x/layout.cellW),
				    Math.floor(src.comp.shape.form.y/layout.cellH),
				    Math.floor(dest.comp.shape.form.x/layout.cellW),
				    Math.floor(dest.comp.shape.form.y/layout.cellH));
		});
	    }
	}
	Component.state = null;
    }
}
