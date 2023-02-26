var line, src, dest, state;
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
		if (state == 'drawing_edge'){
		    this.comp.shape.form.svg.removeChild(line.c_svg);
		    state = null;
		}
	    });
	    this.comp.shape.form.c_svg.addEventListener("mouseup", (e) => {
		if (state == 'drawing_edge'){
		    dest = this;
		    var drc =  (src.type == 'place' && dest.type == 'transition') ? "p2t" :
			(src.type == 'transition' && dest.type == 'place') ? "t2p" : "blabla";
		    if (src.type == this.type){
			line.removeFromDOM();
			line = null;
			src = null;
			dest = null;
		    }
		    else{
			var edge = new Component('edge', {
			    direction: drc,
			    src: src.comp.shape.uuid,
			    dest: dest.comp.shape.uuid
			});
			line.removeFromDOM();
			state = "";
			src = null;
			dest = null;
		    }
		}
	    });
	}
	Register.add(this);
    }

    addConnector(type){
	if (type == this.type)
	    throw new Error('link forbidden');
	if (type == 'edge' && state == 'drawing_edge'){
	    line = aya.Line(src.comp.shape.form.c_points[0].x, src.comp.shape.form.c_points[0].y);
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
	else if (type == 'transition' && state == 'c_transit'){
	    var drc = src.type == 'place' ? 'p2t' : 'blabla';
	    var tr = new Component('transition', {});

	    tr.comp.shape.form.x = src.comp.shape.form.x + 200;
	    tr.comp.shape.form.y = src.comp.shape.form.y;
	    tr.comp.shape.form.redraw();

	    var edge =  new Component('edge', {
		direction: drc,
		src: src.comp.shape.uuid,
		dest: tr.comp.shape.uuid
	    });
	}
    }
}
