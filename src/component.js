var line, src;
class Component{
    constructor(type, props){

	if (!type || !props)
	    throw new Error("missing parameter");
	if (type != 'place' && type != 'edge' && type != 'transition')
	    throw new Error("type isn't correct");

	this.type = type;
	this.comp = Factory.getShape(type, props);

	if (this.type != 'edge'){

	    this.comp.shape.form.svg.removeEventListener("mouseup", ()=>{});

	    this.comp.shape.form.svg.addEventListener("mouseup", ()=>{
		if (line)
		    this.comp.shape.form.svg.removeChild(line.c_svg);
	    });

	    this.comp.shape.form.c_svg.addEventListener("mouseup", (e) => {
		// check if line is define otherwise it will create an edge twice when drawing an edge between two components
		// we need src variable to reference the source component that throws the creation of the edge
		if (line){
		    var drc =  (src.type == 'place' && this.type == 'transition') ? "p2t" :
			(src.type == 'transition' && this.type == 'place') ? "t2p" : "blabla";

		    if (src.type != this.type){
			var edge = new Component('edge', {
			    direction: drc,
			    src: src.comp.shape.uuid,
			    dest: this.comp.shape.uuid
			});
		    }
		    line.removeFromDOM();
		    line = null;
		    src = null;
		}
	    });
	}
	Register.add(this);
    }

    addConnector(type){
	if (type == this.type)
	    throw new Error('link forbidden');

	if (type == 'edge'){
	    line = aya.Line(this.comp.shape.form.c_points[0].x, this.comp.shape.form.c_points[0].y);
	    line.draw();

	    this.comp.shape.form.svg.removeEventListener("mousemove", ()=>{});

	    this.comp.shape.form.svg.addEventListener("mousemove", (e) => {
		if (line){
		    line.dest_x = e.clientX;
		    line.dest_y = e.clientY;
		    line.redraw();
		}
	    });
	}
	else if (type == 'transition'){
	    this.comp.removePanel();

	    var tr = new Component('transition', {});

	    tr.comp.shape.form.x = this.comp.shape.form.x + 200;
	    tr.comp.shape.form.y = this.comp.shape.form.y;
	    tr.comp.shape.form.redraw();

	    var edge =  new Component('edge', {
		direction: "p2t",
		src: this.comp.shape.uuid,
		dest: tr.comp.shape.uuid
	    });
	}
	else if (type == 'deletion'){
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
