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

	    line = aya.Component('line', {x: src.comp.shape.shape.c_points[1].x,
                                      y: src.comp.shape.shape.c_points[1].y,
                                      dest_x: dest.comp.shape.shape.c_points[3].x,
                                      dest_y: dest.comp.shape.shape.c_points[3].y});


	    this.shape = aya.Link(src.comp.shape.shape.c_points[0],
			                  dest.comp.shape.shape.c_points[0], line.shape);
        this.shape.line.children.map(({child})=>{
            child.setStyles({"fill": "black"});
        });
        this.shape.redraw();
    }
}
