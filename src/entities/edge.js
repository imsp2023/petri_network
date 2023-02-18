//import { abstractComponent } from "../abstractions/abstractComponent";

var directions = [
    "p2t",
    "t2p"
];

class Edge {
    constructor(direction, end, end2){
	var dct = null;
	if (!direction || !end)
	    throw new Error("missing parameters");

	if (direction != "p2t" && direction != "t2p")
	    throw new Error("wrong direction");

	if (!end || !end.shape.form.c_svg)
	    throw new Error("wrong parameter");

	if (end2)
	    if (!end2.shape.form.c_svg || end.shape.type == end2.shape.type)
		throw new Error("wrong parameter");

	this.direction = direction;

	this.shape = aya.Component("line", {x: end.shape.form.c_points[0].x, y: end.shape.form.c_points[0].y, dest_x: 50, dest_y: 30});

    }
}
