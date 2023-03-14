//import { abstractComponent } from "../abstractions/abstractComponent";

var directions = [
    "p2t",
    "t2p"
];

class Edge {
    constructor(direction, id_src, id_dest){
	var dct = null;
	var src = null;
	var dest = null;
	var nparams = 0;

	if (!direction || !id_src)
	    throw new Error("missing parameters");

	if (direction != "p2t" && direction != "t2p")
	    throw new Error("wrong direction");

	src = Register.find(id_src);
	if (!src)
	    throw new Error("wrong parameter");
	nparams++;

	if (id_dest != undefined){
	    if (!(dest = Register.find(id_dest)))
		throw new Error("wrong parameter");
	    else if(src.comp.shape.type == dest.comp.shape.type)
		throw new Error("ends must not be of the same type");
	    else
		nparams++;
	}
	this.direction = direction;
	if (nparams == 2){
	    var line = aya.Line(src.comp.shape.form.c_points[0].x, src.comp.shape.form.c_points[0].y, dest.comp.shape.form.c_points[0].x, dest.comp.shape.form.c_points[0].y);
	    line.draw();
	    this.shape = aya.Link(src.comp.shape.form.c_points[0], dest.comp.shape.form.c_points[0], line);
	    this.shape.redraw();
	}
    }
}
