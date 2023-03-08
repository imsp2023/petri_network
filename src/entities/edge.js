//import { abstractComponent } from "../abstractions/abstractComponent";

var directions = [
    "p2t",
    "t2p"
];

//direction, id_src, id_dest
class Edge {
    constructor(props){
	var dct = null;
	var src = null;
	var dest = null;
	var nparams = 0;

	if (!props.direction || !props.src)
	    throw new Error("missing parameters");

	if (props.direction != "p2t" && props.direction != "t2p")
	    throw new Error("wrong direction");

	src = Register.find(props.src);
	if (!src)
	    throw new Error("wrong parameter");
	nparams++;

	if (props.dest != undefined){
	    if (!(dest = Register.find(props.dest)))
		throw new Error("wrong parameter");
	    else if(src.comp.shape.type == dest.comp.shape.type)
		throw new Error("ends must not be of the same type");
	    else
		nparams++;
	}
	this.direction = props.direction;

	if (nparams == 2){
	    var line = aya.Line(src.comp.shape.form.c_points[1].x, src.comp.shape.form.c_points[1].y, dest.comp.shape.form.c_points[1].x, dest.comp.shape.form.c_points[1].y);
	    line.draw();
	    console.log('LINE OK');
	    this.shape = aya.Link(src.comp.shape.form.c_points[1], dest.comp.shape.form.c_points[1], line);
	    this.shape.redraw();
	}
    }
}
