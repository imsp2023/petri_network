//import { abstractComponent } from "../abstractions/abstractComponent";

class Edge {
    constructor(props={}){
	var src, dest, line;
	if (!props.direction || !props.src || !props.dest)
	    throw new Error("missing parameters");

	if ((props.direction != "p2t" && props.direction != "t2p") ||
	    !(src=Register.find(props.src)) ||
	    !(dest=Register.find(props.dest)) ||
	    src.comp.shape.type == dest.comp.shape.type)
	    throw new Error("wrong direction");

	this.src = props.src;
	this.dest = props.dest;
	this.direction = props.direction;

	line = aya.Line(src.comp.shape.form.c_points[0].x,
			src.comp.shape.form.c_points[0].y,
			dest.comp.shape.form.c_points[0].x,
			dest.comp.shape.form.c_points[0].y);
	line.draw();
	
	this.shape = aya.Link(src.comp.shape.form.c_points[0],
			      dest.comp.shape.form.c_points[0], line);
	this.shape.redraw();
    }
}
